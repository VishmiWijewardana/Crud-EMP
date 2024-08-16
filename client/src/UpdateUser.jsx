import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + id)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/updateUser/" + id, { name, email, age, department })
      .then(result => {
        console.log(result);
        setSuccessMessage('Successfully updated ');
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="d-flex justify-content-center py-3">
        Employee Management System
      </h2>
      <h4 className="d-flex justify-content-center bg-danger text-white py-1">SLT Mobitel</h4>
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update Employee</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input 
              type="text" 
              placeholder="Enter Your Name" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input 
              type="text" 
              placeholder="Enter Your Age" 
              className="form-control" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
          <div className="mb-2">
              <label htmlFor="">Department</label>
              <select
                className="form-control"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Account">Account</option>
              </select>
            </div>
          <button className="btn btn-success">Update</button>
        </form>
        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
      </div>
    </div>
    </div>
  );
}

export default UpdateUser;
