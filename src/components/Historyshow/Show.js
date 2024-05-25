import React, { useState ,useEffect } from 'react'
import './Showw.css';
import Topbar from "../topbar/Topbar";
import axios from "axios";

function Show () {

    const [requests, setRequests] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    }
        );
    
     

        useEffect(()=>{
            setRequests({ ...requests, loading: true });
             axios.get('http://localhost:8081/newReq')
             .then((res) => {
                setRequests({ ...requests, results: res.data, loading: false, err: null });
             })
             .catch((err) => {
                setRequests({
                ...requests,
                loading: false,
                err: " something went wrong, please try again later ! ",
              });
     
     });
    },[requests.reload])
     
    //    const handleDelete = (id)=> {
    //      axios
    //       .delete('http://localhost:8081/product/delete/'+id , {
    //       })
    //       .then((res) => {
    //         setRequests({ ...requests, reload: data.reload + 1 });
    //      })
    //           .catch((err) => {});
     
    //   };

     return (
     
        <div className=" showw">
        <Topbar/>
        
      
          <h1> History </h1>
          <div className="table">

           <table className='showtable'>
        
                     <thead>
                         <tr>
                             <th> userID </th>
                             <th> quantity </th>
                             <th> productID </th>
                             <th> warehouseID </th>
                             <th> transaction </th>
                             <th> Action </th>
                         </tr>
                     </thead>
    
                     <tbody>
                         {requests.results.map((req) => (
                             <tr>
                                 <td> {req.userID} </td>
                                 <td> {req.quantity} </td>
                                 <td> {req.productID} </td> 
                                 <td> {req.warehouseID} </td>
                                 <td> {req.transaction} </td>
                    
                                 <td>
                                     <button type='submit'> Accept </button>
                                     <button type='submit'> Decline</button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
    
                 </table>
    
                 </div>
         </div>
         
    )
}

export default Show;