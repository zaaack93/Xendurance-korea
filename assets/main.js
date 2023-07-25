/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  function checkPreviousPage() {
    var previousPage = document.referrer;
    console.log(previousPage);
    if (previousPage.includes('/checkout')) {
      // Execute your function here
      alert('should refresh the cart');
    }
  }
  checkPreviousPage();
  document.addEventListener('variant:change', function (event) {
    try {
      var smartrrProductListCus = Object.values(smartrrProductList)[0];
      smartrrProductListCus.ui.logic.apiChangeVariant(event.detail.variant.id);
      setTimeout(function () {
        smartrrProductListCus.ui.logic.apiChangeVariant(event.detail.variant.id);
      }, 100);
    } catch (e) {
      console.log(e);
    }
  });
  document.addEventListener('cart:change', function (event) {
    var cart = event.detail.cart;
    var isFound = cart === null || cart === void 0 ? void 0 : cart.items.some(function (obj) {
      return obj.id === 45912656118059;
    });
    if (isFound) {
      var _document$querySelect, _document$querySelect2;
      (_document$querySelect = document.querySelector('.product')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.add('cart-has-membership');
      (_document$querySelect2 = document.querySelector('cart-drawer')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.classList.add('membership-in-cart');
    } else if (!isFound && !window.themeVariables.isMember) {
      var _document$querySelect3, _document$querySelect4;
      (_document$querySelect3 = document.querySelector('.product')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.classList.remove('cart-has-membership');
      (_document$querySelect4 = document.querySelector('cart-drawer')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.classList.remove('membership-in-cart');
      // Filter objects with a specific selling plan ID
      var sellingPlanId = 4549771452;
      var filteredObjects = cart === null || cart === void 0 ? void 0 : cart.items.filter(function (obj) {
        var _obj$selling_plan_all, _obj$selling_plan_all2;
        return ((_obj$selling_plan_all = obj.selling_plan_allocation) === null || _obj$selling_plan_all === void 0 ? void 0 : (_obj$selling_plan_all2 = _obj$selling_plan_all.selling_plan) === null || _obj$selling_plan_all2 === void 0 ? void 0 : _obj$selling_plan_all2.id) === sellingPlanId;
      });

      // Find all the "Remove" link buttons
      var ContainerremoveButtons = document.querySelectorAll('line-item');

      // Click on each "Remove" button that corresponds to an object in the filteredObjects array
      ContainerremoveButtons.forEach(function (container) {
        var lineItemKey = container.getAttribute('data-line-item');
        var matchingObject = filteredObjects.find(function (obj) {
          return obj.id.toString() + "-" + sellingPlanId.toString() === lineItemKey;
        });
        if (matchingObject) {
          var _container$querySelec;
          (_container$querySelec = container.querySelector('.line-item__actions .link')) === null || _container$querySelec === void 0 ? void 0 : _container$querySelec.click();
        }
      });
    }
  });
  if (window.location.pathname.includes('/products')) {
    document.addEventListener('cart:change', function (event) {
      var cart = event.detail.cart;
      document.querySelector('.product').classList.remove('cart-has-membership');
      cart === null || cart === void 0 ? void 0 : cart.items.forEach(function (item) {
        if (item.id == 45912656118059) {
          document.querySelector('.product').classList.add('cart-has-membership');
          return;
        }
      });
    });
    document.addEventListener('variant:change', function (event) {
      var variant = event.detail.variant; // Gives you access to the whole variant details
      var product = event.detail.product; // Gives you access to the whole product that the variant belongs to
      var form = event.target; // The form that triggers the change
      if (variant.available) {
        var newItem = "&nbsp;&nbsp;|&nbsp;&nbsp;<span  data-smartrr-product-id=\"".concat(product.id, "\" data-smartrr-price-style=\"overwrite-compare\" data-use-quantity=\"true\"><span data-smartrr-compare-price></span><span data-smartrr-regular-price></span><span smartrr-top-price data-smartrr-subscribe-price></span></span>");
        form.querySelector('button[type="submit"]').querySelector('div').innerHTML += newItem;

        //this button reload the sell price for button add to cart
        var radioBtns = document.querySelectorAll('custom-options .smartrr-group-active input[name="purchase_option"]');
        if (radioBtns) {
          radioBtns.forEach(function (radioBtn) {
            var changeEvent = new Event('change');
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
  var myDiv = document.getElementById('product-compar-price');
  if (myDiv != null) {
    // Create a new MutationObserver instance
    var observer = new MutationObserver(function (mutationsList, observer) {
      var _iterator = _createForOfIteratorHelper(mutationsList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;
          if (mutation.type === 'childList') {
            var content = mutation.target.textContent;
            if (content !== '$INVALID') {
              myDiv.classList.add('valid');
              document.querySelector('span[data-smartrr-subscribe-price]').classList.add('valid');
            } else {
              myDiv.classList.remove('valid');
              document.querySelector('span[data-smartrr-subscribe-price]').classList.add('not-valid');
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });

    // Configuration of the observer:
    var config = {
      childList: true
    };

    // Start observing the target node for configured mutations
    observer.observe(myDiv, config);
  }
})();

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/main": 0,
/******/ 			"assets/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhandee"] = self["webpackChunkhandee"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/main"], () => (__webpack_require__("./src/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/main"], () => (__webpack_require__("./src/scss/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;