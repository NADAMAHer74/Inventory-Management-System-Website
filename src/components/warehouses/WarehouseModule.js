import React from 'react';
import './style/WarehouseModule.css';
import { Link } from 'react-router-dom';

import axios from "axios";
const WarehouseModule = (props) => {
     const handleDelete = (id)=> {
          axios
           .delete('http://localhost:8081/warehouses/'+id )
           .then((res) => {
             
          })
               .catch((err) => {});
      
       };
    
    return ( 

        <div className='warehouseModule'>
             
             <div className='bodyy'>
                  <div className='warehouseName'><b className='font2'>Warehouse Name : </b>{props.name}</div>
                  <div className='warehouseLocation'><b className='font3'>Warehouse Location : </b>{props.location}</div>
                  <div className='warehouseStatus'><b className='font4'>Warehouse Status : </b>{props.status}</div>
             </div>
          
           <div className='botton'>


                      <button className='show'>
                           <Link to={'/warehouses/show/' +props.id}>
                                 Show
                           </Link>
                      </button>

                
                     <button className='Update'>
                         <Link to={'/warehouses/update/' +props.id}>
                               Update
                         </Link>
                     </button>
                
           
                 
                      <button className="Delete"
                  onClick={(e) => {
                    handleDelete(props.id);
                  }}>
                      Delete
                      </button>
                 
           </div>
        </div> 
     );
}
export default WarehouseModule;
