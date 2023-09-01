import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const Srequested = () => {
  const [food, setFood] = useState([]);
  const [isData, setIsData] = useState(false);

  const mail=localStorage.getItem("student")
 
  const navigate = useNavigate();

  const getRequest = async () => {
    try {
      await axios.get(`http://localhost:8080/requests`).then((res) => {
        if (res.data.length > 0) {
          setFood(res.data);
          setIsData(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(food)

  useEffect(() => {
    getRequest();
  }, []);



  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/request/${id}`);
    var newVehicle = food.filter((food) => food.id !== id);
    setFood(newVehicle);
    navigate(`/srequested`);
  };

  console.log(food)
  const { id } = useParams();

  const handleRequest = (id) => {
    navigate(`/ask/${id}`);
  };

  let arr=[]

  for(let i of food)
  {
    if(i.studentEmail===mail)
    {
      arr.push(i)
    }
  }
  console.log(arr)

  function RequestedTable(food) {
    return (
      <tr>
        <td>{food.id}</td>
        <td>
          <img
            src={`http://${window.location.hostname}:8080/images/${food.image}`}
            alt="food"
            height={100}
            width={200}
          />
        </td>
        <td>{food.name}</td>
        <td>{food.price}</td>
        <td>{food.category}</td>
        <td>{food.quantity}</td>
        <td>{food.onDate}</td>
        <td>{food.orderTime}</td>

        <td>{food.requestTime}</td>
        <td>{food.quantity * food.price}</td>

        <td>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleRequest(food.id)}
          >
            Update Request Detail's
          </button>
        </td>

        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(food.id)}
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
      <h2 className="bg-info text-danger text-center">Requested Item's</h2>
      <center>
       
      <h4 className="text-dark bg-warning w-50">{mail}</h4>
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
                <th>Delivery Date</th>

                <th>Delivery Time</th>

                <th>Requested Time</th>

                <th>Amount</th>
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

export default Srequested;
