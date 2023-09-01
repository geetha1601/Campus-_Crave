import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CafeNav from "../../components/cafe/CafeNav";

const CViewFood = () => {
  const [cafe, setCafe] = useState([]);
  const [isData, setIsData] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getFood = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/items`);
      if (res.status === 200) {
        setCafe(res.data);
        setIsData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  const email = localStorage.getItem("cafe");

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/item/${id}`);
    var newCafe = cafe.filter((cafe) => cafe.id !== id);
    setCafe(newCafe);
    navigate(`/cviewfood`)
  };

  const handleEdit = (id) => {
    navigate(`/ceditfood/${id}`);
  };

  const handleAddFood = () => {
    navigate(`/caddfood`);
  };

  let arr = [];

  for (let i of cafe) {
    if (i.email === email) {
      arr.push(i);
    }
  }

  const keys = ["name", "category"];
  const handleSearch = (data) => {
    return data.filter((item) => {
      keys.some((key) => item[key].toLowerCase().includes(search));
    });
  };

  return (
    <div className="container-fluid">
      <CafeNav />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        <div className="col">
          <button
            className=" my-2 btn btn-primary btn-sm"
            onClick={handleAddFood}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-">
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
                {arr.map((item, index) => {
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
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>

                      <td>
                        <i
                          className="far fa-edit fs-4 text-dark"
                          onClick={() => handleEdit(item.id)}
                        ></i>
                      </td>

                      <td>
                        <i
                          class="material-icons fs-2"
                          onClick={() => handleDelete(item.id)}
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

export default CViewFood;
