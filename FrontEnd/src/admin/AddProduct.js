import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { CreateProduct, getAllCategories } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


function AddProduct() {

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: false,
        createdProduct:"",
        getRedirect: false,
        formData: ""
    })

    const {name, description, price, stock, categories,
        category, loading, error, createdProduct, getRedirect,formData} = values

    const preload = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error})
            }
            else{
                setValues({...values, categories:data, formData: new FormData()})

            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    function onSubmit(event) {
        event.preventDefault();
        setValues({...values, error:"", loading:true})
        CreateProduct(user._id, token, formData)
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
                    category: "",
                    photo:"",
                    createdProduct:data.name})
                    }
        })
    }

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({...values, [name] : value})
    }

    function SuccessMessage(){
        return (
            <div className=" mb-3 alert alert-success">
                {createdProduct} Product created successfully
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


    const createProductForm = () => (
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
              placeholder="Category"
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
            Create Product
          </button>
        </form>
      );

  return (
    <Base title='Add a product here!'
    descrption='Welcome to product creation section'
    className='container bg-dark p-3 mb-5'>
        <Link className='btn btn-sm btn-info' to="/admin/dashboard">Go Back</Link>
        <div className="text-white col-6 offset-3 rounded">
            <div className="bg-dark p-4s">
                {createdProduct && SuccessMessage()}
                {error && ErrorMessage()}
                {createProductForm()}
            </div>
        </div>
    </Base>
  )
}

export default AddProduct