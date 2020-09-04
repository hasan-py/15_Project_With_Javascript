/*	(Add to cart) button hover Effect   */
let products = document.querySelectorAll('.product');
let buttons = document.querySelectorAll('.btn');
products.forEach(function(p, index) {
    p.addEventListener('mouseover', function(e) {
        buttons[index].classList.remove("hidden");
    });
});

products.forEach(function(p, index) {
    p.addEventListener('mouseout', function(e) {
        buttons[index].classList.add("hidden");
    });
});


/*	 Cart Section open & close 	*/
let blackOverlay = document.querySelector('#blackOverlay');
let cartSection = document.querySelector('#cartSection');
let cartOpenBtn = document.querySelector('#cartOpenBtn');
let cartCloseBtn = document.querySelector('#cartCloseBtn');
let body = document.querySelector('body');

cartOpenBtn.addEventListener('click', (e) => {
    blackOverlay.classList.remove("hidden")
    cartSection.classList.remove("hidden")
})

cartCloseBtn.addEventListener('click', (e) => {
    blackOverlay.classList.add("hidden")
    cartSection.classList.add("hidden")
})

blackOverlay.addEventListener('click', (e) => {
    blackOverlay.classList.add("hidden")
    cartSection.classList.add("hidden")
})