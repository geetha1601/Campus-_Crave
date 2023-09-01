import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StudentNav from "../../components/student/StudentNav";

const SViewFood = () => {
  const [food, setFood] = useState([]);
  const [isData, setIsData] = useState(false);

  const [search, setSearch] = useState("");

  const { mail } = useParams();
  const studentMail = localStorage.getItem("student");
  const navigate = useNavigate();

  const getFood = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/items`);
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

  let arr = [];

  for (let i of food) {
    if (i.email === mail) {
      arr.push(i);
    }
  }

  console.log(arr);

  const handleCart = async (item) => {
    try {
      item.studentEmail = studentMail;
      axios.post(`http://localhost:8080/cart`, item);
      alert(`Do you want to add ${item.name} to Cart!`);
      navigate(`/smycart`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBook = async (food) => {
    console.log(mail);

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

      var requestTime1 = d + "-" + m + "-" + y + " " + t + ":" + t1;
      food.requestTime = requestTime1;

      food.cafeEmail = mail;
      food.studentEmail = studentMail;
      console.log(food);
      await axios.post(`http://localhost:8080/request`, food);
      alert("Would you like to cotinue for booking?");
      navigate(`/updaterequest/${mail}`);
    } catch (err) {
      console.log(err.response);
    }
  };

  const keys = ["name", "category", "price"];
  const handleSearch = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search))
    );
  };

  return (
    <div className="container-fluid">
      <StudentNav />
      <center>
       
      <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
    </center>
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

        <div className="row">
          <div className="col-md- form-control">
            <div className=" form-control">
              <h2 className="bg-warning text-center text-primary">
                Available Item's
              </h2>
            </div>

            {isData ? (
              <table className="table table-striped table-hover bg-light">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
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
                        <td className="text-primary fs-5">{item.name}</td>
                        <td className="text-success fs-5">
                          {item.price + " ₹"}
                        </td>
                        <td className="text-muted fs-5">{item.category}</td>
                        <td>
                          <i
                            onClick={() => handleCart(item)}
                            className="fas fa-heart fs-4 text-danger"
                          ></i>
                        </td>

                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleBook(item)}
                          >
                            Buy
                          </button>
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
    </div>
  );
};

export default SViewFood;
