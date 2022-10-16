export const addItemtoCart = (item) => {
    let cart = []
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({...item, count:1})

        localStorage.setItem("cart", JSON.stringify(cart))
    }
}  

export const loadCart = () => {
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
        else{
            let cart = []
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
}

export const removeItemfromCart = (productId) => {
    let cart = []
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    
        cart.map((product, i) => {
            if (product._id === productId) {
              cart.splice(i, 1);
            }
          });


    localStorage.setItem("cart", JSON.stringify(cart))
}
return cart;
}

export const EmptyCart = (next) => {
    if (typeof window !== "undefined"){
        localStorage.removeItem("cart")
        let cart=[]
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}



