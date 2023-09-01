import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const Mybooking = () => {
  const [booking, setBooking] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();

  const { mail } = useParams();
  const studentMail = localStorage.getItem("student");

  const getBookings = async () => {
    try {
      await axios.get(`http://localhost:8080/bookings`).then((res) => {
        if (res.data.length > 0) {
          setBooking(res.data);
          setIsData(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(booking)

  useEffect(() => {
    getBookings();
  }, []);

let arr=[];

for(let i of booking){
    if(i.studentEmail===studentMail){
        arr.push(i);
    }
}


console.log(arr)


  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/booking/${id}`);
    var newBooking = booking.filter((book) => book.id !== id);
    setBooking(newBooking);
    alert(`Do you want to cancel booking?`);
    alert(`Check account for refund amount !`);
    navigate(`/sviewbooking`);
  };

  const handleDetails = (id) => {
    navigate(`/sbookingdetails/${id}`);
  };




  function BookingTable(booking) {
    return (
      <td>
        <center>
          <td>
            <td>
              <b>Id :</b>
              {booking.id}
            </td>
            <td>
              <b> Quantity :</b>
              {booking.quantity}
            </td>
            <img
              src={`http://${window.location.hostname}:8080/images/${booking.image}`}
              alt="cafe"
              height={100}
              width={200}
            />
            <td>
              <b> Name :</b>
              {booking.name}{" "}
            </td>

            <td>
              <b>Total :</b>
              {booking.totalAmount + " ₹"}
            </td>
            <br />
            <td>
              <button
                className="btn btn-primary  btn-sm mx-3"
                onClick={() => handleDetails(booking.id)}
              >
                {" "}
                View Detail's
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm "
                onClick={() => handleDelete(booking.id)}
              >
                {" "}
                Cancel
              </button>
            </td>
          </td>
        </center>
      </td>
    );
  }



  return (
    <div>
      <div>
        <StudentNav />
     
      </div>
      <div className=" form-control">
        <div className="form-control">
          <h1 className="bg-success text-center text-white ">My Booking's</h1>
          <center>
       
          <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
        </center>
        </div>

        {isData ? (
          <table className="table table-striped table-hover">
            <tbody>{isData ? arr.map(BookingTable) : null}</tbody>
          </table>
        ) : (
          <center>
            <h4>No data found</h4>
          </center>
        )}
      </div>
    </div>
  );
};

export default Mybooking;
