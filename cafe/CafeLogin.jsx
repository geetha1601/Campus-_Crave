import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "../Header";

const CafeLogin = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    event.preventDefault();
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  }

  function handleClick(event) {
    event.preventDefault();
    if (login.email === "" || login.password === "") {
      alert("Please enter all fields");
    } else {
      try {
        const res = axios
          .post(`http://localhost:8080/cafeLogin`, login)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("cafe", res.data.email);
              navigate(`/cviewfood`);
              window.location.assign(`/cviewfood`);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="my-4 d-flex  ">
        <div className="col-md-4"></div>
     
        <div className="col-md-4 ">
        <div className="form-control"> 
        <h2 className="bg-warning text-center text-primary p-2 "> Cafe Login
        </h2>
        </div>

        
          <form className="container form-control">
            <div className="form-floating">
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={login.email}
                placeholder="test@example.com  "
              ></input>
              <label id="email">Email</label>
            </div>

            <div className="form-floating">
              <input
              id="password"
                className="my-2 form-control"
                type="password"
                name="password"
                onChange={handleChange}
                value={login.password}
                placeholder="Enter password"
              ></input>
              <label id="password">Password</label>
            </div>

            <center>
              <button className="btn btn-primary btn-sm" onClick={handleClick}>
                Login
              </button>
            </center><hr/>

            <center className="my-2">
            <i><b>   <Link to="/studentregister  ">
            Student register ?
          </Link></b></i>
           
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CafeLogin;
