import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const UpdateCart = () => {
  const navigate = useNavigate();

  const studentMail = localStorage.getItem("student");
  
  const [data, setData] = useState({
    quantity: "",
  });

  const { id } = useParams();
  const getVehicle = async () => {
    await axios
      .get(`http://localhost:8080/cart/${id}`)
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getVehicle();
  }, []);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = async (data) => {
    var amount = data.quantity * data.price;
   

    if (amount === 0) {
      alert(`Please enter quantity!`);
    }else {
      try {
    
   
          axios.put(`http://localhost:8080/cart/${id}`, data);
          alert("Cart updated successfully!");
          navigate(`/updatecart`);
          window.location.assign(`/updatecart`);
   
    
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div>
      <StudentNav />
      <center>
       
      <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
    </center>
      <div className=" d-flex form-control">
        <div className="col-md-4"></div>
        <div className="p-3 col-md-4">
          <h2 className="bg-success text-white form-control">
            Update Cart
          </h2>

          <div className="container form-control">
            <div>
              <label>Quantity:</label>
              <input
                className="mt-2 form-control"
                type="number"
                placeholder="Enter quantity "
                name="quantity"
                onChange={handleChange}
                value={data.quantity}
              ></input>
            </div>

            <div className="container form-control">
            <div>
              <label>Name:</label>
              <input
                className="mt-2 form-control"
                type="text"
                placeholder="Enter name "
                name="name"
                onChange={handleChange}
                value={data.name}
              ></input>
            </div>

            <div>
            <label> Price:</label>
            <input
              className="mt-2 form-control"
              type="text"
              value={data.price +" ₹"}
            ></input>
          </div>

            <div>
              <label>Total Amount:</label>
              <input
                className="mt-2 form-control"
                type="text"
                value={data.quantity * data.price +" ₹"}
              ></input>
            </div>

        
            
            
          </div>
          <div
            className=" mt-2 btn btn-primary btn-sm"
            onClick={() => handleClick(data.id)}
          >
            Update
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpdateCart;
