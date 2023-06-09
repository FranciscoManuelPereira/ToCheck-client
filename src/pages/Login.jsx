import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LoginGoogle from "./LoginGoogle";
import "../pages/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      console.log(response.data.authToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="main1">
        <section className='loginSection'>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email"> Email</label>
            <input
              placeholder="EMAIL"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
            />

            <label htmlFor="password"> Password</label>
            <input
              placeholder="PASSWORD"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
            />

            <button className="login-btn" type="submit">
              Login
            </button>
          
          </form>

          <p>Don't have an account? Click on the link below! </p>
          <Link className="log-signup-btn" to="/signup">
            Signup HERE
          </Link>
        </section>
      </div>
    </>
  );
}

export default Login;
