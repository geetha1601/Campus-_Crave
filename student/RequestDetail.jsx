import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const RequestDetail = () => {
  const navigate = useNavigate();
  const [errorMeg, setErrorMeg] = useState({});

  const [data, setData] = useState({
    quantity: "",
    onDate: "",
    orderTime: "",
  });

  const { id,cmail } = useParams();

  // const {id} =useParams()
  // const {cmail} = useParams()
  
  console.log(id)
  console.log(cmail)
  
  const smail=localStorage.getItem("student")
  const getVehicle = async () => {
    const res = await axios
      .get(`http://localhost:8080/request/${id}`)
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

    console.log(cmail)

    var amount = data.quantity * data.price;
   
    data.studentEmail=smail
    data.cafeEmail=cmail

    console.log(data)

    if (amount === 0) {
      alert(`Please enter quantity!`);
    }else {
      try {
        const errors = setErrorMeg(validate(data));

        // if(Object.keys(errors.length === 0 )){
          axios.put(`http://localhost:8080/request/${id}`, data);
          alert("Request detail's added successfully!");
          // navigate(`/srequested`);
          // window.location.assign(`/srequested`);
        // }
    
      } catch (err) {
        console.log(err);
      }
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!values.onDate) {
      errors.onDate = "Please select date!";
    }
    if (!values.orderTime) {
      errors.orderTime = "Please enter delivery time!";
    }

    return errors;
  };

  return (
    <div>
      <StudentNav />
      <div className=" d-flex form-control">
        <div className="col-md-4"></div>
        <div className="p-3 col-md-4">
          <h3 className="bg-success text-white form-control">
            Fill up Request Detail's
          </h3>

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

            <div>
              <label>Enter wish date :</label>
              <input
                className="mt-2 form-control"
                type="date"
                placeholder="Enter wish date"
                min={moment(new Date()).format("YYYY-MM-DD")}
                name="onDate"
                onChange={handleChange}
                value={data.onDate}
              ></input>
            </div>
            <span className="text-danger mb-2">{errorMeg.onDate}</span>

            <div>
              <label>Order Time:</label>
              <input
                className="mt-2 form-control"
                type="time"
                placeholder="Enter order time "
                name="orderTime"
                onChange={handleChange}
                value={data.orderTime}
              ></input>
            </div>
            <span className="text-danger mb-2">{errorMeg.orderTime}</span>
          </div>
          <div
            className=" mt-2 btn btn-primary btn-sm"
            onClick={() => handleClick(data)}
          >
            Send Request
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
