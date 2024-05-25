import React from 'react'
import { useState } from "react";
import './style/Form.css';
import Topbar from "../topbar/Topbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddForm = () => {
  
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("active");


    
    const navigate= useNavigate();
    
    const handleSubmit = (e) =>{
     e.preventDefault();
    //  const blog = { name ,location ,status };
  
  

    axios.post('http://localhost:8081/warehouses', { name ,location,status})
    .then((res) => {
        console.log(res.data);
        navigate('/warehouses');
  
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='addd'> 
      <Topbar/>
     
    <div className='addForm'>
      
         <form onSubmit={handleSubmit}>
            <div className='name'>
                <label for="name">
                    name : <br/>
                </label>
              
                <input 
                    id='name'
                    required
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='location'>
                  <label for="location">
                    location : <br/>
                  </label>
              
                  <input 
                    id='location'
                    type='text'
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
            </div>    


            <div className='status'>
                  <label for="status">
                    status : <br/>
                  </label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                </select>
            </div>


            <div className='submit'>
                <button>
                    Submit
                </button>
            </div>    
         </form>    

         </div>
    </div>
  )
}

export default AddForm
