import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CafeNav from "../../components/cafe/CafeNav";

const Order = () => {
  const [food, setFood] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();
  const cmail=localStorage.getItem("cafe")

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

  const { id } = useParams();

  // const handleAccept = async (id) => {
  //   navigate(`/cask/${id}`);
  // };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/request/${id}`);
    var newVehicle = food.filter((food) => food.id !== id);
    setFood(newVehicle);
    navigate(`/vieworder`);
  };


  let arr=[]

  for(let i of food)
  {
     if(i.cafeEmail===cmail)
     {
        arr.push(i)
     }
  }

  console.log(arr)

  const handleAccept=async(data)=>
  {
    

    data.cafeEmail=localStorage.getItem("cafe")
    data.isAccepted=true

    console.log(data)
    

    let d=new Date().getDate()
    let m=new Date().getMonth()
    let y=new Date().getFullYear()
    let t=new Date().getHours()
    let t1=new Date().getMinutes()
    
     
       var acceptTime1=d+"-"+m+"-"+y+" "+t+":"+t1;
       food.acceptTime=acceptTime1;

        console.log(food.acceptTime)


 
     
    
    axios.patch(`http://localhost:8080/request/${data.isAccepted}/${data.id}/${food.acceptTime}`)
    alert("Request accepted successfully!")
    navigate(`/caccept`)
    window.location.assign(`/caccept`)
  }


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
        <td>{food.studentEmail}</td>
     
        <td>
          <button
            className="btn btn-warning btn-sm "
            onClick={() => handleAccept(food)}
          >
            Accept
          </button>

          <button
          className="btn btn-danger btn-sm mx-2"
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
        <CafeNav />
      </div>
      <div className="lead form-control">
        <h3 className="bg-info text-danger text-center">Order Item's</h3>
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
                <th>Student</th>
            
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

export default Order;
