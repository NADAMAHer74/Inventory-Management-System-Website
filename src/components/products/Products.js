import "./products.css";
import React , {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import ProHeader from "./ProHeader";
import Button from 'react-bootstrap/Button';
// import {toast} from "react-toastify";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import { getAuthUser } from "../../helper/Storage";
// import { Alert } from 'react-bootstrap';

const Products =() => {
    const auth = getAuthUser();
     const [data, setData]= useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });
   
   
 
     useEffect(()=>{
        setData({ ...data, loading: true });
         axios.get('http://localhost:8081/product')
         .then((res) => {
            setData({ ...data, results: res.data, loading: false, err: null });
         })
         .catch((err) => {
            setData({
            ...data,
            loading: false,
            err: " something went wrong, please try again later ! ",
          });
 
 });
},[data.reload])
 
   const handleDelete = (id)=> {
     axios
      .delete('http://localhost:8081/product/delete/'+id , {
        headers: {
            token: auth.token,
          },
      })
      .then((res) => {
        setData({ ...data, reload: data.reload + 1 });
     })
          .catch((err) => {});
 
  };

return (

<div className=" product">
<Topbar/>
            
  <ProHeader/>
  {/* <Alert variant='danger' className='p-2'>This is Alert </Alert>
        <Alert variant='success' className='p-2'>This is Alert </Alert> */}
    <div className="table">
   
  
          <table className="styled-table" >
          
              <thead>
                 <tr>
                    <th >#</th>
                    <th >Name</th>
                    <th >Description</th>
                    <th >image</th>
                    <th >Stock </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.results.map((dataa)=>(
                            <tr key={dataa.id}>
                                <td>{dataa.id}</td>
                                <td>{dataa.name}</td>
                                <td>{dataa.description}</td>
                                <td>
                                   <img src={dataa.image_url} 
                                   alt=" "/></td>
                                <td>{dataa.stock}</td> 
                                <td> 
                                    
                             
                                    <Link to={`/UpdateProduct/${dataa.id}`} ><Button variant="dark" className="m-1">update</Button>
                                 </Link>
                               
                                 <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    handleDelete(dataa.id);
                  }}>
                  Delete
                </button>
                                </td>
                            </tr>
                        )  )
                    }
                </tbody> 
          </table>
    </div>
    </div>
) }
export default Products 
  