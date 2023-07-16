(() => {
    function checkPreviousPage() {
        var previousPage = document.referrer;
        console.log(previousPage)
        if (previousPage.includes('/checkout')) {
          // Execute your function here
          alert('should refresh the cart')
        } 
      }
      checkPreviousPage();
    document.addEventListener('variant:change', function(event) {
        try{
            let smartrrProductListCus =Object.values(smartrrProductList)[0];
            smartrrProductListCus.ui.logic.apiChangeVariant(event.detail.variant.id)
            setTimeout(()=>{
                smartrrProductListCus.ui.logic.apiChangeVariant(event.detail.variant.id)
            },100)
        }
        catch(e){
            console.log(e)
        }
    });

    document.addEventListener('cart:change', function(event) {
        let cart = event.detail.cart;
        let isFound =cart?.items.some(obj => obj.id === 40692118094012)
        if(isFound){
            document.querySelector('.product')?.classList.add('cart-has-membership');
            document.querySelector('cart-drawer')?.classList.add('membership-in-cart')
        }
        else if(!isFound && !window.themeVariables.isMember){
            document.querySelector('.product')?.classList.remove('cart-has-membership');
            document.querySelector('cart-drawer')?.classList.remove('membership-in-cart')
            // Filter objects with a specific selling plan ID
            const sellingPlanId = 4549771452;
            const filteredObjects = cart?.items.filter(obj => obj.selling_plan_allocation?.selling_plan?.id === sellingPlanId);

            // Find all the "Remove" link buttons
            const ContainerremoveButtons = document.querySelectorAll('line-item');

            // Click on each "Remove" button that corresponds to an object in the filteredObjects array
            ContainerremoveButtons.forEach(container => {
                const lineItemKey = container.getAttribute('data-line-item');
                const matchingObject = filteredObjects.find(obj => obj.id.toString()+"-"+sellingPlanId.toString() === lineItemKey);
                if (matchingObject) {
                    container.querySelector('.line-item__actions .link')?.click();
                }
            });
            
        }
    });


    if(window.location.pathname.includes('/products')){
        document.addEventListener('cart:change', function(event) {
            let cart = event.detail.cart;
            document.querySelector('.product').classList.remove('cart-has-membership')
            cart?.items.forEach(item => {
            if(item.id==40692118094012){
                document.querySelector('.product').classList.add('cart-has-membership');
                return;
            }
            });
        });

        document.addEventListener('variant:change', function(event) {
            let variant = event.detail.variant; // Gives you access to the whole variant details
            let product = event.detail.product; // Gives you access to the whole product that the variant belongs to
            let form = event.target; // The form that triggers the change
            if(variant.available){
                let newItem = `&nbsp;&nbsp;|&nbsp;&nbsp;<span  data-smartrr-product-id="${ product.id }" data-smartrr-price-style="overwrite-compare" data-use-quantity="true"><span data-smartrr-compare-price></span><span data-smartrr-regular-price></span><span smartrr-top-price data-smartrr-subscribe-price></span></span>`;
                form.querySelector('button[type="submit"]').querySelector('div').innerHTML+=newItem

                //this button reload the sell price for button add to cart
                const radioBtns = document.querySelectorAll('custom-options .smartrr-group-active input[name="purchase_option"]');
                if(radioBtns){
                    radioBtns.forEach(radioBtn => {
                        const changeEvent = new Event('change');
                        radioBtn.dispatchEvent(changeEvent);
                    });
                }
            }
        });
    }

//     //prevent klaviyo form
//     // Get the form element by its class name
//     var form = document.querySelector('.form-klaviyo-newsletter');

//     // Add an event listener to the form
//     form.addEventListener('submit', function(event) {
//     // Prevent the default form submission behavior
//     event.preventDefault();
    
//     debugger
//     // Add any additional logic or validation here
//     var emailInput = form.querySelector('input[name="contact[email]"]').value;

//     var url = 'https://a.klaviyo.com/client/subscriptions/?company_id=VQ9yJa';

//     var data = {
//     data: {
//         type: "subscription",
//         attributes: {
//         list_id: "XQXPxW",
//         email: emailInput,
//         }
//     }
//     };

// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Revision': '2023-06-15'
//     },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//     console.log(data);
//     })
//     .catch(error => {
//         console.log(error);
//     console.error('Error:', error);
//     });



//     // If you want to submit the form programmatically later, you can call form.submit()
//     });

// Select the <div> element
const myDiv = document.getElementById('product-compar-price');

if(myDiv!=null){
// Create a new MutationObserver instance
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const content = mutation.target.textContent;
      if (content !== '$INVALID') {
        myDiv.classList.add('valid');
        document.querySelector('span[data-smartrr-subscribe-price]').classList.add('valid');
      } else {
        myDiv.classList.remove('valid');
        document.querySelector('span[data-smartrr-subscribe-price]').classList.add('not-valid');
      }
    }
  }
});

// Configuration of the observer:
const config = { childList: true };

// Start observing the target node for configured mutations
observer.observe(myDiv, config);
}
})();