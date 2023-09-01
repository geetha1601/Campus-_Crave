import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CafeNav from "../../components/cafe/CafeNav";

const CAccept = () => {
  const [vehicle, setVehicle] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();

  const cmail=localStorage.getItem("cafe")

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

  console.log(vehicle)




  let arr=[]

  for( let i of vehicle)
  {
    if(i.accepted === true)
    {
          arr.push(i)
    }
  }

  console.log(arr)

  useEffect(() => {
    getRequest();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/request/${id}`);
    var newVehicle = vehicle.filter((vehicle) => vehicle.id !== id);
    setVehicle(newVehicle);
    window.location.assign(`/caccept`);
  };

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
        <CafeNav />
      </div>
      <div className="lead form-control">
        <h3 className="bg-primary text-white text-center"> Accepted Order </h3>
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

export default CAccept;
