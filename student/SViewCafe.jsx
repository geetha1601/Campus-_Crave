import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import StudentNav from "../../components/student/StudentNav";

const SViewCafe = () => {
  const [cafe, setCafe] = useState([]);
  const [isData, setIsData] = useState(false);

  const [search, setSearch] = useState("");

  const studentMail = localStorage.getItem("student");

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

  const { id } = useParams();

  const handleMenu = (mail) => {
    // event.preventDefault();
    navigate(`/sviewfood/${mail}`);
  };



  const keys = ["name", "email", "contact"];
  const handleSearch = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search))
    );
  };


  return (
    <div className="container-fluid">
      <StudentNav />

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <input
            type="text"
            className="form-control w-50 my-3 "
            placeholder="Type here to search cafe..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-">
        <div className=" form-control">
        <h2 className='bg-info text-center text-dark'>Available Cafe</h2>
        <center>
       
        <h4 className="text-dark bg-warning w-50">{studentMail}</h4>
      </center>
        </div>
          {isData ? (
            <table className="table table-striped table-hover bg-light">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email <i className="material-icons fs-4">email</i></th>
                  <th>Password</th>
                  <th>Contact   <i className="material-icons" >local_phone</i></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {handleSearch(cafe).map((item, index) => {
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
                      <td className="text-success fs-5">{item.name}</td>
                      <td className="text-muted fs-5">{item.email}</td>
                      <td className="text-danger fs-5"> {item.password}</td>
                      <td className="text-dark fs-5">{item.contact}   </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={()=>handleMenu(item.email)}
                        >
                          Menu
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
  );
};

export default SViewCafe;
