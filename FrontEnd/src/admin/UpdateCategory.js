import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { UpdateCateory, getCategory } from './helper/adminapicall'

function UpdateACategory() {
    const Navigate = useNavigate();
    const {categoryId} = useParams();
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();

    const GoBack = () => (
        <div>
            <Link className='btn mt-2 btn-sm btn-info'
            to="/admin/categories"
            >Go Back</Link>
        </div>
    )

    const proceedRedirect = () => {
        if (success) {
          Navigate("/admin/categories")
        }
      }

    const preload = () => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setName(data.name)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const handleChange = event => {
        setError("");
        setSuccess("");
        setName(event.target.value)
    } 

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        UpdateCateory(user._id, categoryId, token,{name})
        .then(data => {
            if (data && data.error) {
                return setError(data.error)
            }
            else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
    }

    function SuccessMessage(){
        setTimeout(proceedRedirect, 3000)
        return (
            <div className="alert col-md-6 offset-md-3 text-center alert-success">
                category updated successfully
            </div>
        )
    }

    function ErrorMessage(){
        return (
            <div className="alert col-md-6 offset-md-3 text-center alert-danger">
                Updating category Failed
            </div>
        )
    }

    const UpdateCategoryForm = () =>  (
        <div className="row">
        <div className='col-md-4 offset-md-4'>
        <form>
            <p className="lead">Enter the category</p>
            <input type="text" 
            className='form-control my-3'
            value={name}
            autoFocus
            onChange={handleChange}
            required
            placeholder='"Summer"'
            />
            <button onClick={onSubmit} className="btn btn-outline-success">Update</button>
        </form>
        </div>
        </div>
        )

  return (
    <Base title="Update category" 
    descrption='update your category for your product'
    className='container bg-dark'
    >
        <div className="row ">
        {GoBack()}
        
            <div className="col-md-8 p-4 bg-dark text-white offset-md-2 rounded">
            {success && SuccessMessage()}
            {error && ErrorMessage()}
                {UpdateCategoryForm()}
            </div>
        </div>
    </Base>
  )
}

export default UpdateACategory;