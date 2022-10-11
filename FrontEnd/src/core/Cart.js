import React, { useState, useEffect } from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from './Base'
import Card from './Card'
import { loadCart } from './CartHelper'



export default function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const cartitems = loadCart()
        setProducts(cartitems)
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        AddtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
//
    }


    return (
        <Base title="Cart Page" descrption='Ready to Checkout' className='container'>

            
                {products.length > 0 ? (
                    <div className="row text-white">
                        <div className="col-lg-3 col-md-5 col-sm-5 offset-lg-2">
                            {loadAllProducts(products)}
                        </div>
                        <div className="col-lg-5 mb-4 col-md-6 col-sm-7 bg-warning offset-lg-1">
                            {loadCheckOut()}
                        </div>
                    </div>) : (
                    <div className='col-12 text-center text-dark'>
                        <h2>Oops Add something to cart</h2>
                    </div>
                )}

            
        </Base>
    )
}
