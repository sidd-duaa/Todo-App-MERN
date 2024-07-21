import React, { useEffect, useState } from 'react';
import { login } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this CSS to your component or in a separate CSS file
const styles = `
.login-container {
  height: calc(100vh - 56px); /* Adjust 56px to match your navbar height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}
`;

function Login({ user, setUser }) {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigation('/');
    }
  }, [user, navigation]);

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigation("/");
      } else if (result.data.status === 201) {
        setErrors(result.data.data);
        toast.error(result.data.message);
      } else if (result.data.status === 202) {
        toast.warn(result.data.message);
      }
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className='container-fluid login-container'>
        <ToastContainer />
        <div className="row justify-content-center w-100">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-3">
                <h4 className="mb-0">Login</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className={`form-control ${errors?.username ? 'is-invalid' : ''}`}
                      id="username"
                      name="username"
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                    />
                    {errors?.username && <div className="invalid-feedback">{errors.username.msg}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors?.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    {errors?.password && <div className="invalid-feedback">{errors.password.msg}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;