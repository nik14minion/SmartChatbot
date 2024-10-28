import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

 
    axios.post('http://localhost:3001/api/auth/register', { name, email, password })
    .then(result => {
      if (result.data === "Registered successfully") {
        navigate('/login');  
      } else {
        setErrorMessage(result.data); 
      }
    })
    .catch(err => {
      console.error(err);
      setErrorMessage('Error occurred during signup.');
    });
  
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>} 

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              autoComplete="off"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              autoComplete="off"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>

        <div className="bottom mt-4 text-center">
          <p>Already have an account?</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
