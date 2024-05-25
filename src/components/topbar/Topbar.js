import React from "react";
import "./topbar.css";
import { FaRegBell   } from 'react-icons/fa';
import { FiSettings } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import  Nav  from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {removeAuthUser,getAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate= useNavigate();
    const auth = getAuthUser();
    const Logout =() =>{
        removeAuthUser();
        navigate("/")
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                   
                 <span className="logo">EDARA </span>
               
                </div>
                <Container>
                <Nav className="me-auto">
                    <Link className="nav-link" to ={"/"}>Home</Link>
                      {/* authenticated routes */}
                      {!auth&& (
                        <>
                    <Link className="nav-link" to ={"/login"}>
                        Login </Link>
                         </>
                          )}
                 </Nav>
                 </Container>
               
                <div className="topRight">
                   <div className="topbarIconsContainer">
                     < FaRegBell />
                     <span className="topIconBadge">3</span>
                    </div> 
                    <div className="topbarIconsContainer">
                     < GrLanguage />
                     <span className="topIconBadge">3</span>
                    </div> 
                    <div className="topbarIconsContainer">
                    < FiSettings /> 
                    </div> 


                    {/* authenticated routes */}
                    {
                        auth&&  <Nav className="ms-auto">
                        <Nav.Link onClick={Logout}>Logout </Nav.Link>
                        </Nav>
                    }
                  
                   
                 </div>
            </div>
          
        </div>


    );
}