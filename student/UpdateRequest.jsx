import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const UpdateRequest = () => {
  const [food, setFood] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();

  const {mail}=useParams()

  const studentmail=localStorage.getItem("student")

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

  useEffect(() => {
    getRequest();
  }, []);

  console.log(food)


  let arr=[]

  for(let i of food)
  {
    if(i.studentEmail===studentmail)
    {
      arr.push(i)
    }
  }

  console.log(arr)

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/request/${id}`);
    var newVehicle = food.filter((food) => food.id !== id);
    setFood(newVehicle);
    navigate(`/updaterequest`);
  };

  const { id } = useParams();

  const handleRequest = (id) => {
    navigate(`/ask/${id}/${mail}`);
  };

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
        <td className="text-success fs-5">{food.name}</td>
        <td>{food.category}</td>
        <td className="text-primary fs-5">{food.price + " ₹"}</td>

        <div>
          <td>
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleRequest(food.id)}
            >
              Update Request Detail's
            </button>
          </td>
        </div>

        <div>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(food.id)}
            >
              Cancel
            </button>
          </td>
        </div>
      </tr>
    );
  }

  return (
    <div>
      <div>
        <StudentNav />
      </div>
      <div className="lead form-control">
        <h3 className="bg-info text-danger text-center">Requested Item's</h3>
        <center>
       
        <h4 className="text-dark bg-warning w-50">{studentmail}</h4>
      </center>
        {isData ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>

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

export default UpdateRequest;
