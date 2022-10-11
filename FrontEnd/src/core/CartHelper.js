export const addItemtoCart = (item, next) => {
    let cart = []
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({...item})
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}  

export const loadCart = () => {
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemfromCart = (productId) => {
    let cart = []
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    cart = cart.filter((product) => product._id !== productId )
    localStorage.setItem("cart", JSON.stringify(cart))
}
return cart;
}

export const EmptyCart = (next) => {
    if (typeof window !== "undefined"){
        localStorage.removeItem("cart")
        next();
    }
}

