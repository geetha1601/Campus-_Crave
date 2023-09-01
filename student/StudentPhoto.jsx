import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header";

const StudentRegister = () => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    image: "",
  });

  const naviagte = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errormeg, setErrormeg] = useState({});
  const [images, setImages] = useState();

  function handleChange(event) {
    event.preventDefault();
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  }

  const handleUpload = (e) => {
    setImages((e.target.name = e.target.files[0]));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setErrormeg(validate(student));
      setIsRegister(true);

      if (Object.keys(errormeg.length === 0 && isRegister)) {
        let formData = new FormData();

        formData.append("image", images);
        formData.append("firstName", student.firstName);
        formData.append("lastName", student.lastName);
        formData.append("email", student.email);
        formData.append("password", student.password);
        formData.append("contact", student.contact);

        const res = await axios.post(
          `http://localhost:8080/studentPhoto`,
          formData
        );

        localStorage.setItem("success", res.data.message);
        alert("Student registered successfully!");
        naviagte(`/aviewstudents`);
      }
    } catch (err) {
      toast.error("Invalid credentials!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z]+@[A-Za-z0-9]+\.[a-z]{2,3}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,10}$/;

    if (!values.firstName) {
      errors.firstName = "first name is required!";
      toast.warn("🦄 Please enter valid details !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!values.lastName) {
      errors.lastName = "last name is required!";
    }
    if (!values.email) {
      errors.email = "Enter email!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Inavalid email (test@gmail.com)!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Invalid password!";
    }
    if (!values.contact) {
      errors.contact = "Enter contact!";
    }
    if (!values.image) {
      errors.image = "Upload profile pic!";
    }

    return errors;
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="col-md-5"></div>
        <div className="mt-2  col-md-3 ">
          <div className="form-control">
            <h2 className="bg-warning text-success text-center">
              {" "}
              Student Registration{" "}
            </h2>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>

      <div className="d-flex text-center">
        <div className="col-md-5"></div>
        <div className="col-md-3">
          <div className=" container form-control">
            <div>
              <input
                className="form-control my-2"
                onChange={handleUpload}
                style={{ width: "317px" }}
                name="image"
                type="file"
              ></input>
            </div>
            <span className="text-danger">{errormeg.image}</span>

            <div>
              <input
                className="form-control my-2"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={student.firstName}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{errormeg.firstName}</p>

            <div>
              <input
                className=" mt-3 form-control"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={student.lastName}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{errormeg.lastName}</p>

            <div>
              <input
                className=" mt-3 form-control"
                type="email"
                placeholder="test@gmail.com"
                name="email"
                value={student.email}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{errormeg.email}</p>

            <div>
              <input
                className=" mt-3 form-control"
                type="password"
                placeholder="password"
                name="password"
                value={student.password}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{errormeg.password}</p>

            <div>
              <input
                className=" mt-3 form-control"
                type="text"
                placeholder="contact"
                name="contact"
                value={student.contact}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{errormeg.contact}</p>

            <div>
              <buttun
                className="  btn btn-primary btn-sm"
                onClick={handleClick}
              >
                Register
              </buttun>
            </div><hr/>

            <center className="my-2">
            <i><b>   <Link to="/studentlogin  ">
            Student login ?
          </Link></b></i>
           
            </center>

            <i><b><Link className="text-danger " to="/adminlogin">
            Admin Login ?
            </Link></b></i>
          </div>
        </div>

        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default StudentRegister;
