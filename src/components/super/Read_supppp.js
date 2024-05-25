import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Topbar from "../topbar/Topbar";


function Read_sup(){
    const {id}= useParams();
    const [users, setUsers]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/user/read/'+id)
        .then(res => {
            console.log(res)
            setUsers(res.data[0]);
        })
        .catch(err => console.log(err))

    },[])




    return(
        <div className="update">
        <Topbar/>
        <Card style={{ width: '30rem' }}  className="m-5">
        <Card.Body>
        <Card.Title>Supervisor Detail</Card.Title>
        <Card.Text>
           <h2>ID    : {users.id} </h2>
           <h2>Name :{users.name}</h2>
           <h2>Email : {users.email}</h2>
           {/* <h2>{users.password}</h2> */}
           <h2>phone:{users.phone}</h2>
           <h2>status:{users.status}</h2>
           <h2>type:{users.type}</h2>
         
        </Card.Text>
        <Link to="/homess" >
            <Button variant="dark">back</Button></Link>
      </Card.Body>
    </Card>
        

         

           

           
    </div>  
          
    );
}

export default Read_sup;