import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getAllCategories, getProduct, UpdateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


function UpdateAProduct() {
    const Navigate = useNavigate();
    const {user, token} = isAuthenticated();
    const {productId} = useParams();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        updatedProduct:"",
        getRedirect: false,
        formData: ""
    })

    const {name, description, price, stock, categories,
        category, loading, error, updatedProduct, 
        getRedirect,formData} = values

    const preload = async () => {
        await getProduct(productId).then(data => {
            if (data.error) {
                setValues({...values, error:data.error})
            }
            else{ 
              preloadCategry()
               setValues({
                   ...values,
                   name: data.name, 
                   description: data.description,
                   price: data.price,
                   category: data.category,
                   stock: data.stock,
                   formData: new FormData()
               })
               
           }
       })
       
    }

    const preloadCategry = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error})
            }
            else{
                setValues(values => {return {...values, categories:data, formData: new FormData()}})
            }
        })
    }
    
    useEffect(() => {
        preload()
    }, [])
    
    function onSubmit(event) {
        event.preventDefault();
        setValues({...values, error:"", loading:true})
        UpdateProduct(productId ,user._id, token, formData)
        .then(
            data => {
                if (data.error) {
                    setValues({...values, error:data.error})
                }
                else{
                    setValues({
                    ...values,
                    name: "",
                    description:"",
                    price:"",
                    stock:"",
                    formData: "",
                    error: false,
                    loading:false,
                    photo:"",
                    category: "",
                    getRedirect: true,
                    updatedProduct:data.name})
                    }
        })
    }

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value})
    }

    const proceedRedirect = () => {
      if (getRedirect) {
        Navigate("/admin/products")
      }
    }
    
    function SuccessMessage(){
      setTimeout(proceedRedirect, 2000)
        return (
        <div>
            <div className=" mb-3 alert alert-success">
                <h6>{updatedProduct} Product created successfully</h6> 
            </div>
          </div>
        )
    }

    function ErrorMessage(){
        return (
            <div className=" mb-3 alert text-center alert-danger">
                Creating product Failed
            </div>
        )
    }

    const updateProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group mb-2">
            <label className="btn btn-sm btn-warning">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className='row'>
          <div className="form-group col-md-4">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group col-md-4">
            <select
              onChange={handleChange("category")}
              className="form-control"
            >
              <option>Select</option>
              {categories && categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
            </div>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">
            Update Product
          </button>
        </form>
      );

  return (
    <Base title='Add a product here!'
    descrption='Welcome to product creation section'
    className='container bg-dark p-3 mb-5'>
        <Link className='btn btn-sm btn-info' to="/admin/products">Go Back</Link>
        <div className="text-white col-6 offset-3 rounded">
            <div className="bg-dark p-4s">
                {updatedProduct && SuccessMessage()}
                {error && ErrorMessage()}
                {updateProductForm()}
            </div>
        </div>
    </Base>
  )
}

export default UpdateAProduct