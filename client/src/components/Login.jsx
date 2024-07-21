import React, { useEffect, useState } from 'react'
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({user, setUser}) {
  
  const navigation = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if(user){
        navigation('/');
    }
  }, [user, navigation])

  

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name] : e.target.value });
  };

  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", result);
    setErrors(null);

    if (result.status === 200){
        if(result.data.status === 200){
            localStorage.setItem('user', JSON.stringify(result.data.data));
            navigation("/");
            return;
        }

        if(result.data.status === 201){
            setErrors(result.data.data);
            toast(result.data.message);
            return;
        }

        if(result.data.status === 202){
            toast(result.data.message);
            return;
        }
    }
  };

  return (
    <div className='container'>
        <ToastContainer/>
        <div className="row justify-content-center mt-4">
            <div className="col-lg-5 card border-primary mt-4">
            <div className="card-header">Header</div>
                <div className="card-body">
                    <h4 className="card-title">Login Now</h4>
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                        <input type="text" onChange={handleChange} name='username' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        {
                            errors?.username &&
                            <small id="emailHelp" className="form-text text-muted">{errors.username.msg}</small>
                        }
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Password</label>
                        <input type="password" onChange={handleChange} name='password' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password"/>
                        {errors?.password && (
                            <small id="emailHelp" className="form-text text-muted">{errors.password.msg}</small>
                        )}
                        
                    </div>
                    <br />

                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login