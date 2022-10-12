import {API} from "../../backend";

export const getmeToken = (userId, token) => {
    return fetch(`${API}/payment/braintree/gettoken/${userId}`,{
        method : "GET",
        headers : {
            Accept: "*/*",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => err.json())
}


export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`,{
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(response => response.json())
    .catch(err => err.json())
}