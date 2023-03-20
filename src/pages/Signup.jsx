import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <section className='signupSection'>
    <div className='signupDiv'>
      <h3>Your life flow will change <br/> upon your Signup!</h3>
      <img src="https://res.cloudinary.com/dxsebwid5/image/upload/v1679043489/organizational-life-cycle_gaacb6.webp" alt="cycle organizational life" />  
      <h4>After this step you will give a TOUCHÉ <br/> in your life flow!</h4>
      </div>

      <div className='mainDivForm'>
      
      <h2>Signup Here!</h2>

      <form className='signUpForm' onSubmit={handleSubmit}>
        <label htmlFor="name"> Name</label>
        <input className='inputSignup' type="text" name="name" id="name" value={name} onChange={handleName} />

        <label htmlFor="email"> Email</label>
        <input className='inputSignup' type="email" name="email" id="email" value={email} onChange={handleEmail} />

        <label htmlFor="password"> Password</label>
        <input className='inputSignup'
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <button className='btnSignup' type="submit">Create account</button>
      </form>
      </div>

    </section>
  );
}

export default Signup;