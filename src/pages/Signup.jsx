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
    <section>
      <h1>Your life flow will change now upon your Signup!</h1>
      <h4>After this step you will be able to organize your life better</h4>
      <h4>If you already have a Google Account <Link>Click here!</Link></h4>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name</label>
        <input type="text" name="name" id="name" value={name} onChange={handleName} />

        <label htmlFor="email"> Email</label>
        <input type="email" name="email" id="email" value={email} onChange={handleEmail} />

        <label htmlFor="password"> Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Create account</button>
      </form>

      <p>Again, if you already have a Google Account, click on the below link!</p>
      <Link to="/login">Login without Google</Link>
    </section>
  );
}

export default Signup;