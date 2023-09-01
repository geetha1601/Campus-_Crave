import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';
import AdminNav from '../../components/admin/AdminNav';
import CafeNav from '../../components/cafe/CafeNav';

const EditFood = () => {

    const [cafe,setCafe]=useState({
        id:"",
        name: "",
        category: "",
        price: "",
        image: "",
    })

    const navigate=useNavigate();
    const [errorMeg,setErrorMeg]=useState({})
    const [images, setImages] = useState();
    const [isSubmit,setIsSubmit]=useState(false)

    const {id}=useParams()

    const getCafeById=async() =>{
        const res= await axios.get(`http://localhost:8080/item/${id}`)
        .then((res)=>{
         setCafe(res.data)
        })
     }

     useEffect(()=>{
        getCafeById()
     },[])


     function handleChange(event){
        event.preventDefault();
        setCafe({
            ...cafe,
            [event.target.name]:event.target.value
        })

     }
     const validate = (values) => {
        const errors = {};
    
        const numberRegex = /^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
    

        if (!values.id) {
            errors.id = "Enter item id!";
          }
        if (!values.name) {
          errors.name = "Enter name!";
        }
        if (!values.price) {
          errors.price = "Enter price!";
        }
        if (!numberRegex.test(values.price)) {
          errors.price = "Enter number for price not word!";
        }
        if (!values.category) {
          errors.category = "Enter category!";
        }
        if (!values.image) {
            errors.image = "Required image!";
          }
    
        return errors;
      };
    
      const handleClick = async (event) => {
        event.preventDefault();
        try {
          setErrorMeg(validate(cafe));
          setIsSubmit(true);
    
          if (Object.keys(errorMeg.length === 0 && isSubmit)) {
            let formData = new FormData();
            formData.append("id", id);
            formData.append("image", images);
            formData.append("name", cafe.name);
            formData.append("category", cafe.category);
            formData.append("price", cafe.price);
           
    
            const res = await axios.put(
              `http://localhost:8080/itemPhoto`,
              formData
            );
         
              localStorage.setItem("success", res.data.message);
              alert("Item updated successfully!");
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
    
  
      const handleUpload = (e) => {
        setImages((e.target.name = e.target.files[0]));
      };
    

    return (
        <div>
        <CafeNav />
  
        <div className="d-flex">
          <div className="col-md-4"></div>
          <div className="col-md-3">
            <div className="form-control">
  
            <div className=" form-control bg-warning">
            <h4 className="text-white  text-center"> Update Food</h4>
            </div>
            <span className="text-danger   mb-2">{errorMeg.id}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter item id"
              name="id"
              value={cafe.id}
              onChange={handleChange}
            ></input>

              <span className="text-danger   mb-2">{errorMeg.name}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter food name"
                name="name"
                value={cafe.name}
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
  
              <span className="text-danger mb-2">{errorMeg.category}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter category"
                name="category"
                value={cafe.category}
                onChange={handleChange}
              ></input>
  
              <span className="text-danger mb-2">{errorMeg.price}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter price for item"
                name="price"
                value={cafe.price}
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
    )
}

export default EditFood
