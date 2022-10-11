import React, {useState} from 'react'
import { signup } from '../auth/helper';
import Base from "../core/Base"


function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const {name, email, password, error, success} = values;

  const handleChange = name => event => {
    setValues({
      ...values, 
      error: false, 
      [name]:event.target.value,
    })
  };

  const onSubmit = event => {
    event.preventDefault()
    setValues({...values, error:false})
    signup({name, email, password})
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error, success: false});
      }
      else {
        setValues({...values, name: "", password:"", email:"", error: "", success: true})
      }
    })
  }

  function SignupForm() {
    return (
      <div className="row">
          <div className="text-left col-md-4 offset-md-4">
              <form>
                  <div className="form-group">
                      <label className="text-info">Name</label>
                      <input value={name} onChange={handleChange("name")} className='form-control' type="text" />
                  </div>
                  <div className="mt-2 form-group">
                      <label className="text-info">Email</label>
                      <input value={email} onChange={handleChange("email")} className='form-control' type="email" />
                  </div>
                  <div className="mt-2 form-group">
                      <label className="text-info">Password</label>
                      <input value={password} onChange={handleChange("password")} className='form-control' type="password" />
                  </div>
                  <button onClick={onSubmit} className='btn rounded-pill btn-success btn-block mt-2'>Sign Up</button>
              </form>
          </div>
      </div>
    )
  }

  const SuccessMessage = () => {
    return (
      <div className='mystyle alert alert-success' style={{display: success ? "" : "none"}}>
          Successfully signed up. {success}
          
      </div>
    )
  }

  const ErrorMessage = () => {
    return (
      <div className='mystyle alert alert-warning' style={{display: error ? "" : "none"}}>
          {error} 
          
      </div>
    )
  }

  return (
    <Base title="Sign up page" descrption='A page for user to sign up!'>
    {SuccessMessage()}
    {ErrorMessage()}
    {SignupForm()}
    <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signup;