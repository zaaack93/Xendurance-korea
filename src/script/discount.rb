BUNDLE_DISCOUNTS = [
  {
    bundle_items: [
      {
        product_id: 7091914768572,
        quantity_needed: 1
      },
    ],
    quantity_to_buy: 1,
    discount_product_selector_match_type: :include,
    discount_product_selector_type: :tag,
    discount_product_selectors: ["ALL-PRODUCTS"],
    quantity_to_discount: 100,
    discount_type: :percent,
    discount_amount: 25,
    discount_message: "Buy XND Get 25% Discount",
  },
]

# ================================ Script Code (do not edit) ================================
# ================================================================
# BundleSelector
#
# Finds any items that are part of the entered bundle and saves
# them.
# ================================================================
class BundleSelector
  def initialize(bundle_items)
    @bundle_items = bundle_items.reduce({}) do |acc, bundle_item|
      acc[bundle_item[:product_id]] = {
        cart_items: [],
        quantity_needed: bundle_item[:quantity_needed],
        total_quantity: 0,
      }

      acc
    end
  end

  def build(cart)
    cart.line_items.each do |line_item|
      next unless @bundle_items[line_item.variant.product.id]

      @bundle_items[line_item.variant.product.id][:cart_items].push(line_item)
      @bundle_items[line_item.variant.product.id][:total_quantity] += line_item.quantity
    end

    @bundle_items
  end
end

# ================================================================
# ProductSelector
#
# Finds matching products by the entered criteria.
# ================================================================
class ProductSelector
  def initialize(match_type, selector_type, selectors)
    @match_type = match_type
    @comparator = match_type == :include ? 'any?' : 'none?'
    @selector_type = selector_type
    @selectors = selectors
  end

  def match?(line_item)
    if self.respond_to?(@selector_type)
      self.send(@selector_type, line_item)
    else
      raise RuntimeError.new('Invalid product selector type')
    end
  end

  def tag(line_item)
    product_tags = line_item.variant.product.tags.map { |tag| tag.downcase.strip }
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@selectors & product_tags).send(@comparator)
  end

  def type(line_item)
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@match_type == :include) == @selectors.include?(line_item.variant.product.product_type.downcase.strip)
  end

  def vendor(line_item)
    @selectors = @selectors.map { |selector| selector.downcase.strip }
    (@match_type == :include) == @selectors.include?(line_item.variant.product.vendor.downcase.strip)
  end

  def product_id(line_item)
    (@match_type == :include) == @selectors.include?(line_item.variant.product.id)
  end

  def variant_id(line_item)
    (@match_type == :include) == @selectors.include?(line_item.variant.id)
  end

  def subscription(line_item)
    line_item.selling_plan_id != nil
  end

  def all(line_item)
    true
  end
end

# ================================================================
# DiscountApplicator
#
# Applies the entered discount to the supplied line item.
# ================================================================
class DiscountApplicator
  def initialize(discount_type, discount_amount, discount_message)
    @discount_type = discount_type
    @discount_message = discount_message

    @discount_amount = if discount_type == :percent
      1 - (discount_amount * 0.01)
    else
      Money.new(cents: 100) * discount_amount
    end
  end

  def apply(line_item)
    new_line_price = if @discount_type == :percent
      line_item.line_price * @discount_amount
    else
      [line_item.line_price - (@discount_amount * line_item.quantity), Money.zero].max
    end

    line_item.change_line_price(new_line_price, message: @discount_message)
  end
end

# ================================================================
# DiscountLoop
#
# Loops through the supplied line items and discounts the supplied
# number of items by the supplied discount.
# ================================================================
class DiscountLoop
  def initialize(discount_applicator)
    @discount_applicator = discount_applicator
  end

  def loop_items(cart, line_items, num_to_discount)
    line_items.each_with_index do |line_item|
      break if num_to_discount <= 0

      next if line_item.variant.product.id == 7152992125116 ||
              ProductSelector.new(nil, nil, nil).subscription(line_item)  # Add this line

      if line_item.quantity > num_to_discount
        split_line_item = line_item.split(take: num_to_discount)
        @discount_applicator.apply(split_line_item)
        position = cart.line_items.find_index(line_item)
        cart.line_items.insert(position + 1, split_line_item)
        break
      else
        @discount_applicator.apply(line_item)
        num_to_discount -= line_item.quantity
      end
    end
  end
end

# ================================================================
# BundleDiscountCampaign
#
# If the entered bundle is present, the entered discount is
# applied to the entered product.
# ================================================================
class BundleDiscountCampaign
  def initialize(campaigns)
    @campaigns = campaigns
  end

  def run(cart)
    @campaigns.each do |campaign|
      bundle_selector = BundleSelector.new(campaign[:bundle_items])
      bundle_items = bundle_selector.build(cart)

      next if bundle_items.any? do |product_id, product_info|
        product_info[:total_quantity] < product_info[:quantity_needed] ||
        product_id == 7152992125116
      end

      num_bundles = bundle_items.map do |product_id, product_info|
        (product_info[:total_quantity] / product_info[:quantity_needed])
      end

      num_bundles = num_bundles.min.floor

      product_selector = ProductSelector.new(
        campaign[:discount_product_selector_match_type],
        campaign[:discount_product_selector_type],
        campaign[:discount_product_selectors],
      )

      discount_items = cart.line_items.select { |line_item| product_selector.match?(line_item) }

      next if discount_items.nil?

      discount_applicator = DiscountApplicator.new(
        campaign[:discount_type],
        campaign[:discount_amount],
        campaign[:discount_message]
      )

      discount_loop = DiscountLoop.new(discount_applicator)
      discount_loop.loop_items(cart, discount_items, (campaign[:quantity_to_discount] * num_bundles))
    end
  end
end

CAMPAIGNS = [
  BundleDiscountCampaign.new(BUNDLE_DISCOUNTS),
]

CAMPAIGNS.each do |campaign|
  campaign.run(Input.cart)
end

Output.cart = Input.cart
