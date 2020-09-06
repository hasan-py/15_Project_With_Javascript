/* Selected Item */
let blackOverlay = document.querySelector('#blackOverlay');
let cartSection = document.querySelector('#cartSection');
let cartOpenBtn = document.querySelector('#cartOpenBtn');
let cartCloseBtn = document.querySelector('#cartCloseBtn');
let cartList = document.querySelector('#productInCart');
let clearCart = document.querySelector('#clearCart');
let productList = document.querySelector('#productList');

/* Product Class */
class Product{
    static async getProduct(){
        try{        
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items
            products = products.map(item=>{
                const {title,price} = item.fields
                const {id} = item.sys
                const image = item.fields.image.fields.file.url
                return {id,title,price,image}
            })
            return products;
        }catch (err){
            console.log(err);
        }
    }

    static getSingleProduct(id){
        Product.getProduct().then(data=>{
            let products = data;
            products = products.filter(item=>{
                if(item.id == id){
                    return item
                }
            })
            console.log(products);
        });
    }

    displayProduct(products){
        if(products.length!==0){        
            products.forEach(function(product) {
                let productElem = `
                    <div class="product flex flex-col text-center md:col-span-1 mx-2 my-4 md:my-2">
                        <div class="relative flex items-center justify-end">
                            <img class="cursor-pointer object-cover object-center" src=${product.image} alt="product">
                            <button data-id=${product.id} class="btn hidden absolute mt-20 md:mt-16 lg:mt-16 xl:mt-20 focus:outline-none flex items-center justify-center bg-orange-600 text-sm px-2 py-1 text-white font-semibold uppercase hover:text-black"><svg viewBox="0 0 20 20" fill="currentColor" class="shopping-cart w-4 h-4">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                </svg> <span class="ml-1 uppercase">add to cart</span></button>
                        </div>
                        <div class="text-gray-800 text-xl font-semibold tracking-widest">${product.title}</div>
                        <div class="text-orange-600 font-semibold">$${product.price}</div>
                    </div>
                `
                productList.innerHTML += productElem;
            }); 
            Ui.addToCartBtnHover();
            Product.addToCart();
        }else{
            productList.innerHTML = "";
            productList.innerHTML = `<div class="text-center text-xl font-semibold text-gray-800">No Product</div>`
        }
    }

    displayCart(carts){
        if(carts && carts.length>0){
            carts.forEach(function(cart) {
                let cartElem = `
                   <div class="flex justify-between mb-4">
                        <div class="flex">
                            <img class="object-cover object-center h-24 w-24 mr-4" src="${cart.image}" alt="cart-product">
                            <div class="flex flex-col">
                                <div class="text-lg font-semibold capitalize">${cart.title}</div>
                                <div class="text-lg font-semibold">${cart.price}</div>
                                <div class="text-gray-600 text-sm">remove</div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span><svg viewBox="0 0 20 20" fill="currentColor" class="chevron-up w-4 h-4 fill-current text-orange-600 cursor-pointer">
                                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                                </svg></span>
                            <span class="text-black font-semibold">1</span>
                            <span>
                                <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-down w-4 h-4 fill-current text-orange-600 cursor-pointer">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                `
                cartList.innerHTML += cartElem;
            }); 
        }else{
            cartList.innerHTML = "";
            cartList.innerHTML = `<div class="text-center text-lg font-semibold text-gray-800">No product in cart</div>`
        }
    }

    static addToCart(){
        let allCartBtn = document.querySelectorAll('.btn');
        allCartBtn.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                let productId = btn.dataset.id
                let productData = Product.getSingleProduct(productId);
                JSON.parse(localStorage.setItem("carts",productData))        
                btn.children[1].textContent = "in cart";
                
            });
        });

    }
}

/* Ui Class */
class Ui{
    /*  (Add to cart) button hover Effect   */
    static addToCartBtnHover(){
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
    }

    /*   Cart Section open & close  */
    cartOpenClose(){
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
    }

}

/* Storage Class */
class Storage{
    static getCartFromStorage(){
        if(localStorage.getItem("carts")){
            return JSON.parse(localStorage.getItem("carts"))
        }else{
            return {cart:[]}
        }
    }
}

document.addEventListener('DOMContentLoaded',async (e)=> {
    // Creating instance
    const ui = new Ui();
    const product = new Product();

    // cart slidebar
    ui.cartOpenClose();

    // Get all Product & Display
    Product.getProduct().then(data=>{ 
        product.displayProduct(data);
        product.displayCart(data.slice(0,3));
    });
   

});





