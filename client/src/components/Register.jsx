import React, { useState } from 'react'
import { register } from '../services/api.js'
import { toast } from 'react-toastify';

function Register() {

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async () => {
    const result = await register(form);
    if (result.status === 200){

    }
    else{
      toast("Something went wrong, please try again");
    }
  }

  return <>
    <div className="container">
      <div className="row justify-content-md-center mt-4">
        <div className="col-lg-5 card border-primary mb-3">
          <div className="card-header h4 text-center">
            Register an Account
          </div>
          <div className="card-body">

            <div className="form-group">
              <label className='col-form-label mt-4'>Name</label>
              <input type="text" className='form-control' name='name' onChange={handleInputChange} placeholder='Enter Name'/>
            </div>

            <div className="form-group">
              <label className='col-form-label mt-4'>Username</label>
              <input type="text" className='form-control' name='username' onChange={handleInputChange} placeholder='Enter Username'/>
            </div>

            <div className="form-group">
              <label className='col-form-label mt-4'>Email</label>
              <input type="email" className='form-control' name='email' onChange={handleInputChange} placeholder='Enter Email'/>
            </div>

            <div className="form-group">
              <label className='col-form-label mt-4'>Password</label>
              <input type="password" className='form-control' name='password' onChange={handleInputChange} placeholder='Enter Password'/>
            </div>

            <div className="row justify-content-md-center form-group mt-4">
              <button type='button' onClick={handleSubmit} className='col-sm-6 btn btn-primary center'>Register Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Register