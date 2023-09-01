import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AdminNav from "../../components/admin/AdminNav";



const AddCafe = () => {
  const navigate = useNavigate();
  const [errorMeg, setErrorMeg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [addcafe, setAddCafe] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    image: "",
  });

  const [images, setImages] = useState();

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z]+@[A-Za-z0-9]+\.[a-z]{2,3}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,10}$/;
    const numberRegex = /^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
 //contact must be 10 digits
    const numberRegex2 = /^[0-9]\d{9,10}(\.\d{1,3})?%?$/;
    const wordRegex= /^[A-Za-z]+$/;

    const wordRegex2= /^[A-Za-z]{4,10}$/;

    if (!values.name) {
      errors.name = "Enter name!";
    }   
     else if (!wordRegex.test(values.name)) {
        errors.name = "Enter alphates only not number!";
      }   else if (!wordRegex2.test(values.name)) {
        errors.name = "Enter alphates more than 4 character!";
      } 
       if (!values.email) {
        errors.email = "Enter  email!";
      }   if (!values.password) {
        errors.password = "Enter  password!";
      } if (!values.contact) {
        errors.contact = "Enter  contact!";
      } 
      if(!numberRegex.test(values.contact)){
        errors.contact="Enter number not word!"
      }  else if(!numberRegex2.test(values.contact)){
        errors.contact="Enter number must be 10 digits!"
      }
      if(!emailRegex.test(values.email)){
        errors.email="Enter valid email"
      }
      if(!passwordRegex.test(values.password)){
        errors.password="Enter valid password"
      }
    
    if (!values.image) {
      errors.image = "Required image!";
    }

    return errors;
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setErrorMeg(validate(addcafe));
      setIsSubmit(true);

      if (Object.keys(errorMeg.length === 0 && isSubmit)) {
        let formData = new FormData();

        formData.append("image", images);
        formData.append("name", addcafe.name);
        formData.append("email", addcafe.email);
        formData.append("password", addcafe.password);
        formData.append("contact", addcafe.contact);

        const res = await axios.post(
          `http://localhost:8080/cafePhoto`,
          formData
        );
     
          localStorage.setItem("success", res.data.message);
          alert("Cafe added successfully!");
          navigate(`/aviewcafe`)
       
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

  const handleChange = (event) => {
    event.preventDefault();
    setAddCafe({
      ...addcafe,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (e) => {
    setImages((e.target.name = e.target.files[0]));
  };

  return (
    <div>
      <AdminNav />

      <div className="d-flex">
        <div className="col-md-4"></div>
        <div className="col-md-3">
          <div className="form-control">

          <div className=" form-control bg-secondary">
          <h4 className="text-white  text-center"> Add Cafe</h4>
          </div>
            <span className="text-danger   mb-2">{errorMeg.name}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter cafe name"
              name="name"
              value={addcafe.name}
              onChange={handleChange}
            ></input>

            <span className="text-danger  mb-2">{errorMeg.image}</span>
            <div>
              <input
                className="form-control"
                onChange={handleUpload}
                style={{ width: "317px" }}
                name="image"
                type="file"
              ></input>
            </div>

            <span className="text-danger mb-2">{errorMeg.email}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="email"
              placeholder="Enter cafe email-id"
              name="email"
              value={addcafe.email}
              onChange={handleChange}
            ></input>

            <span className="text-danger mb-2">{errorMeg.password}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter cafe password"
              name="password"
              value={addcafe.password}
              onChange={handleChange}
            ></input>
  

            <span className="text-danger text-center mb-2">{errorMeg.contact}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter cafe contact"
              name="contact"
              value={addcafe.contact}
              onChange={handleChange}
            ></input>
  
            <div className="text-center">
            <button className="btn btn-primary btn-sm text-center  "
            onClick={handleClick}
            >Submit</button>
            </div>

          </div>
      

         
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default AddCafe;
