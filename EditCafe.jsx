import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';
import AdminNav from '../../components/admin/AdminNav';

const EditCafe = () => {

    const [cafe,setCafe]=useState({
        id:"",
        name:"",
        email:"",
        password:"",
        contact:"",
        image:""
    })

    const navigate=useNavigate();
    const [errorMeg,setErrorMeg]=useState({})
    const [images, setImages] = useState();
    const [isSubmit,setIsSubmit]=useState(false)

    const {id}=useParams()

    const getCafeById=async() =>{
        const res= await axios.get(`http://localhost:8080/cafe/${id}`)
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
        const emailRegex = /^[a-zA-Z]+@[A-Za-z0-9]+\.[a-z]{2,3}$/;
        const passwordRegex = /^[a-zA-Z0-9]{6,10}$/;
    
        if (!values.name) {
          errors.name = "Enter cafe name!";
        }    if (!values.email) {
            errors.email = "Enter  email!";
          }   if (!values.password) {
            errors.password = "Enter  password!";
          } if (!values.contact) {
            errors.contact = "Enter  contact!";
          } 
          if(!emailRegex.test(values.email)){
            errors.email="Enter valid email"
          }
          if(!passwordRegex.test(values.password)){
            errors.password="Enter valid password"
          }
          if (!values.id) {
            errors.id = "Enter id!";
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
            formData.append("email", cafe.email);
            formData.append("password", cafe.password);
            formData.append("contact", cafe.contact);
    
            const res = await axios.put(
              `http://localhost:8080/cafePhoto`,
              formData
            );
         
              localStorage.setItem("success", res.data.message);
              alert("Cafe updated successfully!");
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
  
            <div className=" form-control bg-warning">
            <h4 className="text-white  text-center"> Update Cafe</h4>
            </div>
            <span className="text-danger   mb-2">{errorMeg.id}</span>
            <input
              className="mt-2 mb-2  form-control "
              type="text"
              placeholder="Enter cafe id"
              name="id"
              value={cafe.id}
              onChange={handleChange}
            ></input>

              <span className="text-danger   mb-2">{errorMeg.name}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter cafe name"
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
  
              <span className="text-danger mb-2">{errorMeg.email}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="email"
                placeholder="Enter cafe email-id"
                name="email"
                value={cafe.email}
                onChange={handleChange}
              ></input>
  
              <span className="text-danger mb-2">{errorMeg.password}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter cafe password"
                name="password"
                value={cafe.password}
                onChange={handleChange}
              ></input>
    
  
              <span className="text-danger text-center mb-2">{errorMeg.contact}</span>
              <input
                className="mt-2 mb-2  form-control "
                type="text"
                placeholder="Enter cafe contact"
                name="contact"
                value={cafe.contact}
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

export default EditCafe
