/* Selected Item */
let blackOverlay = document.querySelector('#blackOverlay');
let cartSection = document.querySelector('#cartSection');
let cartOpenBtn = document.querySelector('#cartOpenBtn');
let cartCloseBtn = document.querySelector('#cartCloseBtn');
let cartList = document.querySelector('#productInCart');
let clearCart = document.querySelector('#clearCart');
let productList = document.querySelector('#productList');
let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ;

/* Product Class */
class Product{
    async getProduct(){
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
}

/* Ui Class */
class Ui{
    /*  (Add to cart) button hover Effect   */
    addToCartBtnHover(){
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

}

document.addEventListener('DOMContentLoaded',async (e)=> {
    // Creating instance
    const ui = new Ui();
    const product = new Product();
    let Maindata;

    // cart slidebar
    ui.cartOpenClose();

    // Get all Product & Display
    product.getProduct().then(data=>{ 
        Maindata = data  
        ui.displayProduct(Maindata);
        // Hover effect in card
    });
   

});





