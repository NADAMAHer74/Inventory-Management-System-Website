import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import  './Home.css';
import Topbar from "../topbar/Topbar";
import { getAuthUser } from "../../helper/Storage";



const Home_sup =()=> {
     const auth = getAuthUser();
     const [data, setData]= useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
     });
    // const [data, setData]= useState({
    //     loading: true,
    //     results: [],
    //     err: null,
    //     reload: 0,
    //   });
   
    useEffect(()=>{
        setData({ ...data, loading: true });
        axios.get('http://localhost:8081/user/getuser')
        .then((res) =>{
            setData({...data, results: res.data, loading: false, err: null });
        }) 
        .catch((err) => {
            setData({
            ...data,
            loading: false,
            err: " something went wrong, please try again later ! ",
          });
        });
},[data.reload])

  const handleDelete =  (id)=> {
      axios.delete('http://localhost:8081/user/delete/'+id ,{
        headers: {
            token: auth.token,
          },})
     .then((res) => {
        setData({ ...data, reload: data.reload + 1 });
    })
         .catch((err )=> {})

 };
    return (
        <div>
        <Topbar/>
      <div className="d-flex vh-100  justify-content-center align-items-center"
      style={{backgroundColor:"#f7eede"}}>
        <div className="w-70 bg-white rounded p-3">
       
            <h2> Manage Supervisore</h2>

            <div className="d-flex justify-content-end">
                <Link to ="/users">
                 <Button variant="success">Add +</Button></Link>
                
            </div>


            <Table striped bordered hover size="sm" >
                <thead>
                    <tr >
                        <th>id</th>
                        <th> Name</th>
                        <th> Email</th> 
                        <th> Phone</th>
                        <th> Status</th>
                        <th> actions</th>
                    </tr>
                </thead>
                <tbody>
                   

                {data.results.map((user) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td>{user.status}</td>
    <td>
      <Link to={`/read/${user.id}`}>
        <Button variant="dark" className="m-1">
          Show
        </Button>
      </Link>
      <Link to={`/update/${user.id}`}>
        <Button variant="dark" className="m-1">
          Update
        </Button>
      </Link>
      <button
        className="btn btn-sm btn-danger"
        onClick={(e) => {
          handleDelete(user.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
))}
                </tbody>
            </Table>
        </div>
        </div>
        </div>

      
    );
  }
  
  export default Home_sup;