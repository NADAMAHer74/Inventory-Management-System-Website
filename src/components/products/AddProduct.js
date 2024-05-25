import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import {getAuthUser} from "../../helper/Storage";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import Topbar from "../topbar/Topbar"

const AddProduct =()=> {
  const auth = getAuthUser();
  const [data, setData] = useState({
    name: "",
    description: "",
    stock:"",
    warehouseID:"",
    // image_url: null,
    err: "",
    loading: false,
    success: null,
  });
  const image = useRef(null);

  const createProduct = (e) =>{
    e.preventDefault();

setData({ ...data, loading: true });
const formData = new FormData();
formData.append("name", data.name);
formData.append("description", data.description);
formData.append("stock", data.stock);
formData.append("warehouseID", data.warehouseID);
if (image.current.files && image.current.files[0]) {
  formData.append("image", image.current.files[0]);
}

// const navigate = useNavigate();

  axios.post('http://localhost:8081/product/', formData, {
    headers: {
      token: auth.token,
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    setData({
      name: "",
          description: "",
          stock:"",
          warehouseID:"",
          err: null,
          loading: false,
          success: "product Created Successfully !",
    });
    image.current.value = null;
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



  return (
    <div>
    <Topbar/>
      <div className="d-flex vh-100  justify-content-center align-items-center"
      style={{backgroundColor:"#ada79b"}}>
          <div className="w-50 bg-white rounded p-3">
        <h1> Add new Product</h1>
        {/* <Alert variant='danger' className='p-2'>This is Alert </Alert>
        <Alert variant='success' className='p-2'>This is Alert </Alert> */}
   <Form onSubmit={createProduct}>

        <Form.Group className="mb-3" >
        <Form.Control 
        value={data.name}
        onChange={(e)=> setData({ ...data, name: e.target.value })}  
        type="text"
        required
         placeholder="Product name"/>
    </Form.Group>  

   <Form.Group className="mb-3" >
      <textarea
      className='form-control'
      placeholder='Description'
      value={data.description}
      required 
       onChange={(e)=> setData({ ...data, description: e.target.value })} 
      rows={5}></textarea>
    </Form.Group>  

    <Form.Group className="mb-3" >
     <input type='file' className='form-control' ref={image} required/>
    </Form.Group>  
 

    <Form.Group className="mb-3" >
    <Form.Control 
        value={data.stock}
        onChange={(e)=> setData({ ...data, stock: e.target.value })}  
        type="text"
        required
         placeholder="stock"/>
         
    </Form.Group>  
    <Form.Group className="mb-3" >
    <Form.Control 
        value={data.warehouseID}
        onChange={(e)=> setData({ ...data, warehouseID: e.target.value })}  
        type="text"
        required
         placeholder="warehouse ID"/>
         
    </Form.Group> 

    <Button className='btn btn-dark w-100' variant='primary' type='submit'>add new product</Button>


  </Form>
  
    </div>
    </div>
    </div>
  );
}
export default AddProduct;