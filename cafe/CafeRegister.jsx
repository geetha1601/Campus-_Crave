import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const CafeRegister = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    document:'',
    image: "",
  });

  const naviagte = useNavigate();

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
      {
        let formData = new FormData();

        formData.append("image", images);
        formData.append("name", student.name);

        formData.append("email", student.email);
        formData.append("password", student.password);
        formData.append("contact", student.contact);

        const res = await axios.post(
          `http://localhost:8080/cafePhoto`,
          formData
        );

        localStorage.setItem("success", res.data.message);
        alert("Cafe registered successfully!");
        naviagte(`/cviewfood`);
        }
    } catch (err) {
 
    console.log(err)
    }
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
              Cafe Registration{" "}
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
                
            <label> CafePhoto</label>
              <input
                className="form-control my-2"
                onChange={handleUpload}
                style={{ width: "317px" }}
                name="image"
                type="file"
              ></input>
            </div>
          
            <div>
              <input
                className="form-control my-2"
                type="text"
                placeholder="cafe Name"
                name="name"
                value={student.name}
                onChange={handleChange}
              ></input>
            </div>

            <div>
                <label>Cafe document</label>
              <input
                className="form-control my-2"
                onChange={handleUpload}
                style={{ width: "317px" }}
                name="document"
                type="file"
              ></input>
            </div>
         

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
   

            <div>
              <buttun
                className="  btn btn-primary btn-sm"
                onClick={handleClick}
              >
                Register
              </buttun>
            </div>
            <hr />

            <center className="my-2">
              <i>
                <b>
                  {" "}
                  <Link to="/studentlogin  ">Student login ?</Link>
                </b>
              </i>
            </center>

            <i>
              <b>
                <Link className="text-danger " to="/adminlogin">
                  Admin Login ?
                </Link>
              </b>
            </i>
          </div>
        </div>

        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default CafeRegister;
