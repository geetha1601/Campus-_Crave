import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

const ViewStudents = () => {
  const [student, setStudent] = useState([]);
  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();

  const getStudents = async () => {
    try {
      await axios.get(`http://localhost:8080/students`).then((res) => {
        if (res.data.length > 0) {
          setStudent(res.data);
          setIsData(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/student/${id}`);
    var newStudent = student.filter((student) => student.id !== id);
    setStudent(newStudent);
    navigate(`/aviewstudents`);
  };

  function StudentTable(student) {
    return (
      <tr>
        <td>{student.id}</td>
        <td>
          <img
            src={`http://${window.location.hostname}:8080/images/${student.image}`}
            alt="student"
            height={150}
            width={200}
          />
        </td>
        <td className="text-muted fs-5">{student.firstName}</td>
        <td className="text-muted fs-5">{student.lastName}</td>
        <td className="text-success fs-5">{student.email}</td>
        <td className="text-muted fs-5">{student.contact}</td>

        <td>
          <i
            class="material-icons fs-3"
            onClick={() => handleDelete(student.id)}
          >
            delete_forever
          </i>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div className="lead form-control">
        <h2 className="bg-success text-center text-white">
          Registerd Student's <i className="material-icons fs-1">supervisor_account</i>
        </h2>
        {isData ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>
                  Email <i className="material-icons fs-4">email</i>
                </th>

                <th>
                  Contact <i className="material-icons">local_phone</i>
                </th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>{isData ? student.map(StudentTable) : null}</tbody>
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

export default ViewStudents;
