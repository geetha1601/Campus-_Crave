import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";


const Saccept = () => {
  const [vehicle, setVehicle] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();


  const { mail } = useParams();
  const studentMail=localStorage.getItem("student")

  const getRequest = async () => {
    try {
      await axios.get(`http://localhost:8080/requests`).then((res) => {
        if (res.data.length > 0) {
          setVehicle(res.data);
          setIsData(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);


  let arr=[]

  for( let i of vehicle)
  {
    if(i.accepted === true && i.email===mail)
    {
          arr.push(i)
    }
  }


  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/request/${id}`);
    var newVehicle = vehicle.filter((vehicle) => vehicle.id !== id);
    setVehicle(newVehicle);
    window.location.assign(`/sacceptorder`);
  };

  const {id}=useParams()

  const handlePay=(id)=>{
    navigate(`/payment/${id}`)
  }

  function RequestedTable(vehicle) {
    return (
      <tr>
      <td>{vehicle.id}</td>
     <td>
     <img
     src={`http://${window.location.hostname}:8080/images/${vehicle.image}`}
     alt="cafe"
     height={100}
     width={200} 
   />
     </td>
        <td>{vehicle.name}</td>
        <td>{vehicle.price}</td>
        <td>{vehicle.category}</td>
        <td>{vehicle.quantity}</td>
        <td>{vehicle.onDate}</td>
        <td>{vehicle.orderTime}</td>
        <td>{vehicle.requestTime}</td>
        <td>{vehicle.acceptTime}</td>
      
        <td>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handlePay(vehicle.id)}
          >
            Pay
          </button>
        </td>

        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(vehicle.id)}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div>
        <StudentNav />
      </div>
      <div className="lead form-control">
      <div className="form-control">
      <h2 className="bg-info text-danger text-center"> Accepted Order </h2>
      <center>
       
      <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
    </center>
      </div>
        {isData ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Wish Date</th>
                <th>Delivery Time</th>
                <th>Request Time</th>
                <th>Accept Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{isData ? arr.map(RequestedTable) : null}</tbody>
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

export default Saccept;
