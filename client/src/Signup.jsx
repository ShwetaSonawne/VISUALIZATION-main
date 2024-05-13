import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./loginsignup.css";

//import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setErrors] = useState({});
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  //const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validation();
    setErrors(error);
    if (Object.values(error).every(error => error === "")) {
        axios.post("http://localhost:3001/register", { fname, lname, date, gender, email,password})
        .then((result) => {
          console.log(result);
          alert("successful");
          navigate("/login");
        })
        .catch((err) => console.log(err));
        
      } else {
        // If there are validation errors, do not proceed with registration
        alert("Please fix the errors before submitting the form.");
      } 
      
  };

  const validation = () => {
    const error = {};

    if (!fname) {
      error.fname = "First Name is Required";
    } else {
      error.fname = "";
    }

    if (!lname) {
      error.lname = "Last Name is Required";
    } else {
      error.lname = "";
    }

    if (!date) {
      error.date = "DOB is Required";
    } else {
      error.date = "";
    }

    if (!gender) {
      error.gender = "Gender is Required";
    } else {
      error.gender = "";
    }

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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fname">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              autoComplete="off"
              name="fname"
              className="form-control"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            {error.fname && <div className="error-message">{error.fname}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="lname">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              autoComplete="off"
              name="lname"
              className="form-control"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            {error.lname && <div className="error-message">{error.lname}</div>}
          </div>
          <div className="mb-3">
          <label htmlFor="gender">
              <strong>Select Gender  </strong>
            </label>
            <select 
               id = "gender"
               value = {gender}
               className="form-control"
               onChange={(e) => setGender(e.target.value)}
            >
              <option value="">---Select---</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
              
            </select>
              
            {error.gender && <div className="error-message">{error.gender}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="dob">
              <strong> Date of Birth </strong>
            </label>
            <DatePicker
            id="date"
            type="date"
            selected={date} 
            className="form-control"
            onChange={(date) => setDate(date)} 
            />
            {error.date && <div className="error-message">{error.date}</div>}
          </div>
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
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <div className="error-message"> {error.password}</div>}
          </div>
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
        <p className="login-link"> Already Have an Account?
        <Link
          to="/login"> Login </Link>
          </p>
      </div>
    </div>
  );
}

export default Signup;