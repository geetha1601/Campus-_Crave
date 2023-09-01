import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const Payment = () => {
  const [data, setData] = useState({
    price: "",
    quantity: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    totalAmount: "",
    bookingDate: "",
  });

  const navigate = useNavigate();
  const [errorMeg, setErrorMeg] = useState({});


  const { mail } = useParams();
  const studentMail = localStorage.getItem("student");

  const { id } = useParams();

  const getVehicle = async () => {
    await axios.get(`http://localhost:8080/request/${id}`).then((res) => {
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

  const validate = (values) => {
    const errors = {};
    const numberRegex = /^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
    //cvv length must be 3 digit
    const cvvRegex1 = /^[0-9]\d{2}(\.\d{1,3})?%?$/;

    if (!values.quantity) {
      errors.quantity = "Please enter item quantity!";
    }

    if (!values.cvv) {
      errors.cvv = "Please enter cvv !";
    } else if (!numberRegex.test(values.cvv)) {
      errors.cvv = "Please enter digits only for cvv !";
    } else if (!cvvRegex1.test(values.cvv)) {
      errors.cvv = "Please enter cvv exact 3 digits!";
    }
    if (!values.cardNumber) {
      errors.cardNumber = "Please Enter card number !";
    } else if (values.cardNumber.length !== 16) {
      errors.cardNumber = "Please enter card number exactly 16 digits  !";
    }

    if (!values.expiryDate) {
      errors.expiryDate = "Please select expiry date!";
    }

    return errors;
  };

  const handleClick = async (data) => {
    let d = new Date().getDate();
    let m = new Date().getMonth();
    let y = new Date().getFullYear();
    let t = new Date().getHours();
    let t1 = new Date().getMinutes();

    var bDate = d + "/" + m + "/" + y + " " + t + ":" + t1;
    data.bookingDate = bDate;

    var totalAmount1 = data.quantity * data.price;
    data.totalAmount = totalAmount1;
    if (totalAmount1 === 0) {
      alert("Please select quantity !");
    } else {
      try {
        // const errors = setErrorMeg(validate(data));
        // setIsPaid(true);

        // if (Object.keys(errors).length === 0 && isPaid) {


        data.studentEmail = studentMail;
        axios.post(`http://localhost:8080/booking`, data);
        alert(`Are you sure to pay ${data.quantity * data.price} ₹  ?`);
        alert(`Paid ${data.quantity * data.price} ₹ Successfully !`);
        navigate(`/sviewbooking`);
        window.location.assign(`/sviewbooking`);
        // }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <StudentNav />
      <div className=" d-flex">
        <div className="col-md-4"></div>
        <div className="p-3 col-md-4">
          <div className="container form-control">
            <h3 className="bg-primary text-white text-center">
              Pay the Amount
            </h3>

            <div className="form-control">
              <div>
                <label className="mt-3">Quantity :</label>
                <input
                  className="mt-2 form-control"
                  type="text"
                  placeholder="Enter quantity "
                  name="quantity"
                  onChange={handleChange}
                  value={data.quantity}
                  required
                ></input>
              </div>

              <div>
                <label className="mt-3">Price :</label>
                <input
                  className="mt-2 form-control"
                  type="text"
                  placeholder="Enter price "
                  name="price"
                  onChange={handleChange}
                  value={data.price + " ₹"}
                  required
                ></input>
              </div>

              <div>
                <label className="mt-3 ">
                  <b>Total Amount :</b>
                </label>
                <input
                  className="mt-2 form-control"
                  type="text"
                  value={data.price * data.quantity + " ₹"}
                  required
                ></input>
              </div>

              <div>
                <label className="mt-3">Enter debit/credit card no:</label>
                <input
                  className="mt-2 form-control"
                  type="text"
                  placeholder="Enter debit/credit card no"
                  name="cardNumber"
                  onChange={handleChange}
                  value={data.cardNumber}
                  required
                ></input>
              </div>
              <span className="text-danger  mb-2">{errorMeg.cardNumber}</span>

              <div>
                <label className="mt-3">card cvv:</label>
                <input
                  className="mt-2 form-control"
                  type="text"
                  placeholder="Enter card cvv"
                  name="cvv"
                  onChange={handleChange}
                  value={data.cvv}
                  required
                ></input>
              </div>
              <span className="text-danger   mb-2">{errorMeg.cvv}</span>

              <div>
                <label className="mt-3">Enter debit/credit expiry date:</label>
                <input
                  className="mt-2 form-control"
                  type="month"
                  placeholder="Enter debit/credit expiry date"
                  name="expiryDate"
                  onChange={handleChange}
                  value={data.expiryDate}
                  required
                ></input>
              </div>
              <span className="text-danger   mb-2">{errorMeg.expiryDate}</span>

              <div className="my-2 text-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleClick(data)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
