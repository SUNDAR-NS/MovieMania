import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import image from './7.jpg';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { name, password, category });

      console.log(response.data);

      const { category: userCategory } = response.data;

      if (userCategory === "Admin") {
        navigate('/AWelcome', { state: { name: name } });
      } else if (userCategory === "Reviewer") {
        navigate('/RWelcome', { state: { name: name } } );
      } else {
        console.error('Invalid category:', userCategory);
      }

    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title" onClick={() => navigate('/')}>Movie Mania</h1>
        <button className="llogout-button" onClick={() => navigate('/')}>Home</button>
      </header>
        <img src={image} alt='null' className="enjoy"/>
      <div className="login-div">
        <div className="login">
          <h2 className="title">Login</h2>
          <input className="input-log" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
          <input className="input-log" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <select className="loption" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="Admin">Admin</option>
            <option value="Reviewer">Reviewer</option>
          </select>
          <button className="button" onClick={handleLogin}>Login</button>
          {error && <p className="error-message">{error}</p>}
          <h1 className="lor">or</h1>
          <Link to="/Register" className="register-b">
            New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
