import { API } from "../../backend";

export const CreateOrder = (userId, token, orderData) =>{
    return fetch(`${API}/order/create/${userId}`,{
        method: "POST",
        headers : {
            Accept : "*/*",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({order : orderData}) 
    }).then(response => response.json())
    .catch(err  => console.log(err))
}