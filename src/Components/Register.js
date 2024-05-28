import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Register.css';
import image from './7.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, password, category });

      console.log(response.data);
      
      navigate('/RWelcome');
    } catch (error) {
      setError("User Already Exists");
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title" onClick={() => navigate('/')}>Movie Mania</h1>
        <button className="llogout-button" onClick={() => navigate('/')}>Home</button>
      </header>
    <img src={image} alt="null" className="enjoy"/>
      <div className="register">
        <div className="register-div">
        <h2 className="title">Register</h2>
        <input className="input-reg" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input-reg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select className="roption" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Reviewer">Reviewer</option>
        </select>
        <button className='button' onClick={handleRegister}>Register</button>
        {error && <p className="error-message">{error}</p>}
        <h1 className="or">or</h1>
        <Link to="/Login" className="login-b">
          Already have an Account
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Register;
