import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminNav from "../../components/admin/AdminNav";

const ViewCafe = () => {
  const [cafe, setCafe] = useState([]);
  const [isData, setIsData] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getCafes = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cafes`);
      if (res.status === 200) {
        setCafe(res.data);
        setIsData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCafes();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/cafe/${id}`);
    var newCafe = cafe.filter((cafe) => cafe.id !== id);
    setCafe(newCafe);
    alert(`Do you want to delete !`);
  };

  const handleEdit = (id) => {
    navigate(`/aeditcafe/${id}`);
  };

  const handleAddCafe = () => {
    navigate(`/addcafe`);
  };

  const keys = ["name", "email", "contact"];
  const handleSearch = (data) => {
    return data.filter((item) => {
      keys.some((key) => item[key].toLowerCase().includes(search));
    });
  };

  return (
    <div className="container-fluid">
      <AdminNav />
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
            onClick={handleAddCafe}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-">
          <div className="form-control">
            <h2 className="bg-warning text-center text-danger">
              <b>Cafe</b> <i className="fa fa-home fs-2 text-success mx-2"></i>
            </h2>
          </div>
          {isData ? (
            <table className="table table-striped table-hover bg-light">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>
                    Contact <i className="fa fa-phone-square fs-4"></i>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cafe.map((item, index) => {
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
                      <td className="text-muted fs-5">{item.email}</td>
                      <td className="text-muted fs-5">{item.password}</td>
                      <td className="text-success fs-5">{item.contact}</td>

                      <td>
                        <i
                          className="far fa-edit fs-5 text-dark"
                          onClick={() => handleEdit(item.id)}
                        ></i>
                      </td>

                      <td>
                        <i
                          class="material-icons fs-3"
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

export default ViewCafe;
