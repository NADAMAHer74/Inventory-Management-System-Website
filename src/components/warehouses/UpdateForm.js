import React from 'react'
import { useState } from "react";
import './style/Form.css';

import { useParams } from 'react-router-dom';
import Topbar from "../topbar/Topbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddForm = () => {
    // const warehouseData=Data;
    const {key}=useParams();

    const [name, setName] = useState([key].name);
    const [location, setLocation] = useState([key].location);
    const [status, setStatus] = useState([key].status);

      const navigate= useNavigate()

    const handleSubmit = (e) =>{
     e.preventDefault();
    //  const blog = { name ,location ,status };
    axios
        .put('http://localhost:8081/warehouses/' +key, { name ,location,status})
        .then((res) => {
          console.log(res.data);
          navigate('/warehouses');
        })
        .catch((err) => console.log(err));
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
                    <option value="in-active">inactive</option>
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

export default AddForm;