import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper'
import Base from "../core/Base"


function Signin() {

  const Navigate = useNavigate();

  const [values, setValues] = useState({
    email: "ajay@gmail.com",
    password: "16031999",
    error: "",
    loading: false,
    didRedirect: false,
  }) 
  
  const {email, password, error, loading, didRedirect} = values
  

  const handleChange = name => event => {
    setValues({
      ...values, 
      error: false, 
      [name]:event.target.value,
    })
  };

  const {user} = isAuthenticated();

  const onSubmit = event => {
  
    event.preventDefault();
    setValues(preValues => {return {...preValues, error:false, loading:true,}})
    signin({email, password})
    .then(data => {
      if (data && data.error) {
        
        setValues(preValues => {return {...preValues, error:data.error, loading:false}})
      }
      else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true
          })
        })
      }
    })
  
  }

  // const performRedirect = () => {
    
  //   if (didRedirect) {
  //     if (user && user.role === 1){
  //       return Navigate("/admin/dashboard")
  //     }
  //     else {
  //       return Navigate("/user/dashboard")
  //     }
  //   }
  //   if (isAuthenticated()){
  //     return <Navigate to="/" />;
  //   }
  // }

  useEffect(() => {
    if (user) {
      if (didRedirect) {
        if (user && user.role === 1){
          return (
          Navigate("/admin/dashboard")
        )}
        else {
          return (
          Navigate("/user/dashboard")
        )}
      }
      if (isAuthenticated()){
        Navigate("/")
      }
    }
  },[user, Navigate, didRedirect])


  const LoadingMessage = () => {
    return (
      loading && (
        <div className="mystyle alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }

  const ErrorMessage = () => {
    return (
      <div className='mystyle alert alert-warning' style={{display: error ? "" : "none"}}>
          {error} 
          
      </div>
    )
  }

  function SignInForm() {
    return (
      <div className="row">
          <div className="col-md-4 offset-md-4">
              <form>
                  <div className="form-group">
                      <label className="text-info">Email</label>
                      <input onChange={handleChange("email")} value={email} className='form-control' type="email" />
                  </div>
                  <div className="mt-2 form-group">
                      <label className="text-info">Password</label>
                      <input onChange={handleChange("password")} value={password} className='form-control' type="password" />
                  </div>
                  <button onClick={onSubmit} className='btn rounded-pill btn-success mt-2'>Sign In</button>
              </form>
          </div>
      </div>
    )
  }


  return (
    <Base title="Sign in page" descrption='A page for user to sign In!'>
    {LoadingMessage()}
    {ErrorMessage()}
    {SignInForm()}
    {/* {performRedirect()} */}
    <p className='text-center text-white'>{JSON.stringify(values)}</p>
    </Base>
  )
} 

export default Signin