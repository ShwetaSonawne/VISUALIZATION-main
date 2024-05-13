// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";


function Login() {
  const [error, setErrors] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validation();
    setErrors(error);
    if (Object.values(error).every(error => error === "")) {
            axios.post("http://localhost:3001/login", { email, password })
        .then((result) => {
          console.log(result);
          alert("Done");
          if (result.data === "Success") {
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
      }
      else {
        // If there are validation errors, do not proceed with registration
        alert("Please fix the errors before submitting the form.");
      } 
      
  };

  const validation = () => {
    const error = {};

    if (!email) {
      error.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "email not matched";
    } else {
      error.email = "";
    }

    if (!password) {
      error.password = "password is Required";
    } else if (password.length < 6) {
      error.password = "password not matched";
    } else {
      error.password = "";
    }

    return error;
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="error-message">{error.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <div className="error-message"> {error.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
        <p></p>
        <p className="signup-link"> Create an Account 
        <Link
          to="/register"> Signup </Link></p>
      </div>
    </div>
  );
}

export default Login;