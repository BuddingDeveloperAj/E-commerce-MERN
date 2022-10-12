import DropIn from 'braintree-web-drop-in-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { EmptyCart, loadCart } from './CartHelper'
import { CreateOrder } from './helper/OrderHelper'
import { getmeToken, processPayment } from './helper/paymentHelper'


export default function BraintreePayment({ products, setReload, reload = undefined }) {

    const user = isAuthenticated() && isAuthenticated().user
    const token = isAuthenticated() && isAuthenticated().token
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "", 
        instance: ""
    })

    const {success, clientToken, error, instance} = info;

    const getToken = (user, token) => {
        getmeToken(user._id, token).then(data => {
            if (data.error) {
                setInfo({ ...info, error: data.error })
            }
            else {
                const clientToken = data.clientToken
                setInfo({ clientToken: clientToken })
            }
        })
    }

    const showBTdropIn = () => {
        return (
            <div>
                {clientToken !== null && products.length > 0
                 ? (
                        <div className='d-grid gap-2'>
                            <DropIn
                                options={{ authorization: clientToken }}
                                onInstance={(instance) => setInfo({...info, instance}) }
                            />
                            <button className='btn mb-3 mx-2 btn-primary ' onClick={onPurchase}>Buy</button>
                        </div>
                    ) : (
                        <h3>
                            Please log in or Something to the cart
                        </h3>
                    )}
            </div>
        )
    }

    useEffect(() => {
        getToken(user, token)
    }, [])


    const onPurchase = () => {
    
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(user._id, token, paymentData)
      .then(response => {
        setInfo({ ...info, success: response.success, loading: false });
        const orderData = {
            products : products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount
        };
        CreateOrder(user._id, token, orderData)
        EmptyCart()
        setReload(!reload);
      })
      .catch(error => {
        setInfo({ loading: false, success: false });
      });

        })
    }


    
    function getAmount() {
        let amount = 0
        products.map(product => {
            amount = amount+ product.price
        })
        return amount
    }

    return (
        <div className='bg-dark text-white text-center'>
            <h3>Checkout Section</h3>
            <h2>Your bill is ${getAmount()}</h2>
            {showBTdropIn()}
        </div>
    )
}
