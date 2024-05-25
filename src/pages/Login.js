import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 import './Login.css';
// import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import {setAuthUser} from "../helper/Storage";
import Topbar from "../components/topbar/Topbar";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate= useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        loading: false,
        err:[]
    });

    const LoginFun = (e) =>{
        e.preventDefault();
        setLogin({...login, loading: true, err: []})
        axios.post("http://localhost:8081/auth/login" , {
            email: login.email,
            password: login.password,
        })
        .then(resp => {
            setLogin({...login, loading: false, err: [] });
            setAuthUser(resp.data);
            navigate("/")
        })
        .catch(errors => {
            setLogin({
                ...login, 
                loading: false, 
                err: errors.response.data.errors,
            });
        });
    };
    return (
        <div className="login">
            <Topbar/>
      <div className="login-container">
        <h2 className="text-2xl font-bold text-center mb-4">Admin</h2>

        {login.err.map((error, index ) => (
            <Alert key= {index} variant="danger" className="p-2">
                {error.msg}
            </Alert>
        ))}

        <Form onSubmit={LoginFun}>
            <Form.Group className="mb-3" >
                <Form.Control type="email" 
                placeholder="Email"
                required
                value={login.email} 
                onChange={(e) => setLogin({...login, email: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Control type="password" 
                placeholder="Password"
                required
                value={login.password} 
                onChange={(e) => setLogin({...login, password: e.target.value })} />
            </Form.Group>

            <Button className="btn btn-dark w-100" variant="primary" type="submit"
            disabled = {login.loading ===true}>
                Login
            </Button>
            
        </Form>
      </div>
      </div>
    );
};

export default Login;