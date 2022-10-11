import { API } from "../../backend";

//create category
export const CreateCateory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers : {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
    },
      body: JSON.stringify(category)
}).then(response => response.json())
.catch(err => console.log(err))
}

//get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method : "GET",  
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//create a product
export const CreateProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method : "POST",
        headers : {
            Accept: "*/*",
            Authorization : `Bearer ${token}`,
        },
        body : product
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method : "GET",  
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//delete a product
export const DeleteProduct = (userId, productId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept: "*/*",
            Authorization : `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method : "GET",  
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//update a product
export const UpdateProduct = (productId, userId, token, updateInfo) => {
    return fetch(`${API}/products/${productId}/${userId}`,{
        method: "PUT",
        headers : {
            Accept: "*/*",
            Authorization : `Bearer ${token}`
        },
        body: updateInfo
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

//Delete Category
export const DeleteCategory = (userId, categoryId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE", 
        headers : {
            Accept : "*/*",
            Authorization : `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
} 


//Update category
export const UpdateCateory = (userId, categoryId, token, updateInfo) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers : {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateInfo)
    }).then(response => response.json())
    .catch(err => console.log(err))
}

//getCategory
export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        headers: {
            Accept: "*/*"
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
} 