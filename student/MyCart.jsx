import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StudentNav from "../../components/student/StudentNav";

const MyCart = () => {
  const [food, setFood] = useState([]);
  const [isData, setIsData] = useState(false);

  const [search, setSearch] = useState("");

  const studentMail = localStorage.getItem("student");

  const navigate = useNavigate();


  
  const getFood = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/carts`);
      if (res.status === 200) {
        setFood(res.data);
        setIsData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  const handleBook = async (food) => {
    try {
      let d = new Date().getDate();
      let m = new Date().getMonth();
      let y = new Date().getFullYear();
      let t = new Date().getHours();
      let t1 = new Date().getMinutes();

      console.log(d);
      console.log(m);
      console.log(y);
      console.log(t);

      var requestTime1 = d + "/" + m + "/" + y + " " + t + ":" + t1;
      food.requestTime = requestTime1;

      await axios.post(`http://localhost:8080/request`, food);
      alert("Would you like to cotinue for booking?");
      navigate(`/updaterequest/:mail`);
    } catch (err) {
      console.log(err.response);
    }
  };

  let arr=[];

for(let i of food){
    if(i.studentEmail===studentMail){
        arr.push(i);
    }
}

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/cart/${id}`);
   
   alert(`Do you want to remove from cart ? `); 
    var newfood = food.filter((item) => item.id !== id);
    setFood(newfood);
  };

  const keys = ["name", "category"];
  const handleSearch = (data) => {
    return data.filter((item) => 
      keys.some((key) => item[key].toLowerCase().includes(search))
    );
  };

  return (
    <div className="container-fluid">
    <h2>{food.smail}</h2>
      <StudentNav />
      <div className="row ">
        <div className="col"></div>
        <div className="col my-2">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Type here to search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-">
          <div className="form-control">
            <div>
              <h2 className="bg-success text-center text-white ">
                My Cart <i className="fas fa-cart-arrow-down fs-7"></i>
              </h2>
              <center>
       
              <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
            </center>
            </div>
          </div>

          {isData ? (
            <table className="table table-striped table-hover bg-light">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price(₹)</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch(arr).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={`http://${window.location.hostname}:8080/images/${item.image}`}
                          alt="cafe"
                          height={100}
                          width={200}
                        />
                      </td>
                      <td className="text-muted fs-5">{item.name}</td>
                      <td className="text-muted fs-5">{item.category}</td>
                      <td className="text-success fs-5">{item.price +" ₹"}</td>
                     
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleBook(item)}
                        >
                          Buy
                        </button>
                      </td>

                      <td>
                        <i
                          onClick={() => handleDelete(item.id)}
                          className="material-icons fs-3 text-danger"
                        >
                        delete_forever
                        </i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <center>
              <h4>No Data Found</h4>
            </center>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
