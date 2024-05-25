import React, { useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Add_super.css';
import Topbar from "../topbar/Topbar";
import {getAuthUser} from "../../helper/Storage";

const Add_sup=()=>{
  const auth = getAuthUser();
    const [data, setData]= useState({
        name : "" , 
        email : "",  
        phone : "",
        warehouse_ID: "",
        // status : "",
        // type:"",
        err: "",
        loading: false,
        success: null,

    })
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues ({ ...values, [name]: value });
    //   };



    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();


        setData({...data, loading: true}) ;
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("warehouse_ID", data.warehouse_ID);

// formData.append("status", data.status);
formData.append("type", data.type);
        axios.post('http://localhost:8081/user/', formData ,{
          headers: {
            token: auth.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setData({
      name: "",
      email : "",  
      phone : "",
      warehouse_ID : "",
      // status : "",
      // type:"",
          err: null,
          loading: false,
          success: "super Created Successfully !",
          
            
    });
             navigate('/homess')

        })
        .catch((err) => {
          setData({
            ...data,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !",
          });
        });
      };
      

    return(
      <div>
      <Topbar/>
        <div className="d-flex vh-100 justify-content-center align-items-center"
        style={{backgroundColor:"#ada79b"}}>
          <div className="w-50 bg-white rounded p-3">
            <h1>Add Supervisor</h1> 
             <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">

        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name"
        name="name" value={data.name} 
        onChange={(e)=> setData({ ...data, name: e.target.value })} />
      </Form.Group>         


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        name="email" 
        value={data.email} 
        onChange={(e)=> setData({ ...data, email: e.target.value })}/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Phone"
        name="phone"
         value={data.phone} 
         onChange={(e)=> setData({ ...data, phone: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control type="status" placeholder="Status"
        name="status" value={data.status} onChange={(e)=> setData({ ...data, status: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>Type</Form.Label>
        <Form.Control type="type" placeholder="Type"
        name="type" value={data.type} onChange={(e)=> setData({ ...data, type: e.target.value })} />
      </Form.Group>

      
      
      <Button className="btn btn-dark" variant="primary" type="submit">
        Add
      </Button>
    </Form>
            

    </div>            

    </div>
              </div>
    )



}

export default Add_sup;
