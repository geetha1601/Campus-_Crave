import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "../Header";

const StudentLogin = () => {
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
          .post(`http://localhost:8080/studentLogin`, login)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("student", res.data.email);
              navigate(`/sviewcafe/${res.data.email}`);
              window.location.assign(`/sviewcafe/${res.data.email}`);
              alert(`Student logged in successfully!`);
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
      <div className="my-5 d-flex  ">
        <div className="col-md-4"></div>

        <div className="col-md-4 ">
          <div className="form-control">
            <h3 className="bg-success text-light text-center p-2 ">
              Student Login
            </h3>
          </div>
          <form className="container form-control">
            <div className="form-floating">
              <input
              id="email"
                className="form-control"
                type="email"
                name="email"
                onChange={handleChange}
                value={login.email}
                placeholder="test@example.com  "
              ></input>
              <label for="email">Email</label>
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
              <label for="password">Password</label>
            </div>

            <center>
              <button className="btn btn-primary btn-sm" onClick={handleClick}>
                Login
              </button>
            </center><hr/>

            <center className="my-2">
              <i>
                <b>
                  {" "}
                  <Link className="text-dark " to="/studentregister  ">
                    Student register ?
                  </Link>
                </b>
              </i>{" "}
              <br />
              <i>
                <b>
                  <Link className="text-danger " to="/adminlogin">
                    Admin Login ?
                  </Link>
                </b>
              </i>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
