import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { CreateCateory } from './helper/adminapicall'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddCategory() {
    const Navigate = useNavigate();
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const notify = () => toast("category created successfully", {autoClose: 3000});
    const {user, token} = isAuthenticated();

    const GoBack = () => (
        <div>
            <Link className='btn mt-2 btn-sm btn-info'
            to="/admin/dashboard"
            >Go Back</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setSuccess("");
        setName(event.target.value)

    } 

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        CreateCateory(user._id, token, {name})
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

    function ErrorMessage(){
        return (
            <div className="mystyle mb-3 alert text-center alert-danger">
                Creating category Failed
            </div>
        )
    }

    const newCategoryForm = () =>  (
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
            <button onClick={onSubmit} className="btn btn-outline-warning">ADD</button>
        </form>
        </div>
        </div>
        )

  return (
    <Base title="Create a category here" 
    descrption='Add a new category for your product'
    className='container bg-dark'
    >
        <div className="row ">
        {GoBack()}
        {success && notify() && setTimeout(()=> Navigate("/admin/dashboard"), 3000)}
        {error && ErrorMessage()}
            <div className="col-md-8 p-4 bg-dark text-white offset-md-2 rounded">
                
                {newCategoryForm()}
                
            </div>
        </div>
        <ToastContainer />
    </Base>
  )
}

export default AddCategory;