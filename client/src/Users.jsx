import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [Users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        setSuccessMessage("Successfully deleted"); 
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/');
          }, 2000); 
       
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="d-flex  justify-content-center py-3">
        Employee Management System
      </h2>
        <h4 className="d-flex justify-content-center bg-danger text-white py-1">SLT Mobitel</h4>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <h2 className="d-flex justify-content-center bg-primary text-white j">List of Employee </h2>
          <Link to="/create" className="btn btn-success">
            Add Employee
          </Link>
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.department}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success">
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {successMessage && (<div className="alert alert-success mt-3">{successMessage}</div>)}
        </div>
      </div>
    </div>
  );
}

export default Users;
