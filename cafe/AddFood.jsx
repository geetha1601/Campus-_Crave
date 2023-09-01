import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CafeNav from "../../components/cafe/CafeNav";

const AddFood = () => {
  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const [errorMeg, setErrorMeg] = useState({});
  const [images, setImages] = useState();
  const [isSubmit, setIsSubmit] = useState(false);




  const validate = (values) => {
    const errors = {};

    const numberRegex = /^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
    //price must between 2 to 3 digit 
    const numberRegex2 = /^[0-9]\d{1,2}(\.\d{1,3})?%?$/;
   const wordRegex= /^[A-Za-z]+$/;
   const wordRegex2= /^[A-Za-z]{4,10}$/;

    if (!values.name) {
      errors.name = "Enter name!";
    } 
    else if (!wordRegex.test(values.name)) {
        errors.name = "Enter alphabates only not number!";
      }
      else if (!wordRegex2.test(values.name)) {
        errors.name = "Enter alphabates more than 4 cahracter!";
      }
  
    if (!values.price) {
      errors.price = "Enter price!";
    }
   else  if (!numberRegex.test(values.price)) {
      errors.price = "Enter number for price not word!";
    }
   else if (!numberRegex2.test(values.price)) {
        errors.price = "Enter number for price between 2 to 3 digits only!";
      }
    if (!values.category) {
      errors.category = "Enter category!";
    }    else if (!wordRegex.test(values.category)) {
        errors.category = "Enter alphabates only not number!";
      }
      else if (!wordRegex2.test(values.category)) {
        errors.category = "Enter alphabates more than 4 cahracter!";
      }
    if (!values.image) {
        errors.image = "Required image!";
      }

    return errors;
  };

const email=localStorage.getItem("cafe")

console.log(email)

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setErrorMeg(validate(food));
      setIsSubmit(true);
    food.email=email;
      if (Object.keys(errorMeg.length === 0 && isSubmit)) {
        let formData = new FormData();

        formData.append("image", images);
        formData.append("name", food.name);
        formData.append("price", food.price);
        formData.append("category", food.category);
        formData.append("email",email)
 
        console.log(formData)
 
        const res = await axios.post(
          `http://localhost:8080/itemPhoto`,
          formData
        );
     
          localStorage.setItem("success", res.data.message);
          alert("Item added successfully!");
       navigate(`/cviewfood`)
       
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
    setFood({
      ...food,
      [event.target.name]: event.target.value,
    });
  };

  const handleUploadImage = (e) => {
    setImages((e.target.name = e.target.files[0]));
  };

  return (
    <div>
      <CafeNav />
      <div className="d-flex ">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="form-control" >

          <div className="bg-secondary">
          <h4 className="text-center text-white">Add Food</h4>
          </div>

            <span className="text-danger   mb-2">{errorMeg.name}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter food name"
              name="name"
              value={food.name}
              onChange={handleChange}
            ></input>

            <span className="text-danger  mb-2">{errorMeg.image}</span>
            <div>
              <input
                className="form-control"
                onChange={handleUploadImage}
                style={{ width: "427px" }}
                name="image"
                type="file"
              ></input>

              <span className="text-danger   mb-2">{errorMeg.price}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter food price"
                name="price"
                value={food.price}
                onChange={handleChange}
              ></input>

              <span className="text-danger   mb-2">{errorMeg.category}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter food category"
                name="category"
                value={food.category}
                onChange={handleChange}
              ></input>
            </div>

            <center>
            <button
            className="btn btn-primary btn-sm text-center"
            onClick={handleClick}
          >
            Submit
          </button>
            </center>
         
           
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default AddFood;
