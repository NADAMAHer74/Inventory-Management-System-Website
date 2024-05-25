import React, { useState } from 'react';
// import data from "./mock-data.json";
import "./sendrequest.css";
import Topbar from "../topbar/Topbar";
import axios from 'axios';

// function Sendreq() {

//     const [requests, setRequests] = useState([]);
//     const [addFormData, setAddFormData] = useState({
//         userID: "",
//         // Dates:"",
//         quantity: "",
//         productID: "",
//         warehouseID: "",
//         transaction: "",
//         err: "",
//         loading: false,
//         success: null,
//     });
//     const handleAddFormChange = (event) => {
//         event.preventDefault();

//         const fieldName = event.target.getAttribute("Name");
//         const fieldValue = event.target.value;

//         const newFormData = { ...addFormData };
//         newFormData[fieldName] = fieldValue;
//         setAddFormData(newFormData);
//     }
//     const handleAddFormSubmit = (event) => {
//         event.preventDefault();

//         const newRequest = {
//             userID: addFormData.userID,
//             // Dates:addFormData.Dates,
//             quantity: addFormData.quantity,
//             productID: addFormData.productID,
//             warehouseID: addFormData.warehouseID,
//             transaction: addFormData.transaction,
//         };

//         const newRequests = [...requests, newRequest];
//         setRequests(newRequests);
//     }


//     axios.post('http://localhost:8081/newReq/', addFormData ,{})
//       .then((res) => {
//         setAddFormData({
//             userID: "",
//             // Dates:"",
//             quantity: "",
//             productID: "",
//             warehouseID: "",
//             transaction: "",
           
//               err: null,
//               loading: false,
//               success: "req send Successfully !",
//         });
//       })
       
    
//       .catch((err) => {
//         setAddFormData({
//           ...addFormData,
//           loading: false,
//           success: null,
//           err: "Something went wrong, please try again later !",
//         });
//       });
    
    






//     return (

//         <div>
//         <Topbar/>
//             <h2 className='Title'> New request </h2>

//             <form onSubmit={handleAddFormSubmit}>
//                 <div className='req'>
//                 <label for ="id">User ID</label>
//                 <input id="id" type='text ' name='ID' required="required" placeholder='Enter an ID.. ' onChange={handleAddFormChange} /><br/>
               
//                 {/* <label for ="Dates">Dates</label>
                
//                 <input id="Dates" type='date ' name='Dates' required="required" placeholder='Enter an Dates.. ' onChange={handleAddFormChange} /><br/> */}
// {/* 
//                 <label for="checkin-date"> Date</label>
//                  <input type="date" id="checkin-date" name="checkin" required  onChange={handleAddFormChange}></input> <br/> */}
       
//                 <label for ="stc">Quantity</label>
//                 <input id="stc" type='text ' name='Quantity' required="required" placeholder='Enter a Quantity.. ' onChange={handleAddFormChange} /> <br/>
               
//                 <label for ="prdct">PRODUCTS</label>
//                 <input id="prdct" type='text ' name='Products' required="required" placeholder='Enter a product.. ' onChange={handleAddFormChange} /><br/>
               
//                 <label for="war">WARHOUSE</label>
//                 <input id="war" type='text ' name='Warhouses' required="required" placeholder='Enter a Warhouse.. ' onChange={handleAddFormChange} /> <br/>
//                 </div>
               
//                 {/* <input  id ="INC" type='radio' name='Request' value='Increase' />
//                 <label className='INC'  for="INC" > Increase </label>
               
//                 <input id ="DEC" type='radio' name='Request' value='Decrease' />
//                 <label className='DEC' for="DEC" > Decrease</label> */}

//                 <label for="reqq">Requests</label>
               
//                 <input  className='reqq' id="reqq" type='text ' name='Requests' required="required" placeholder='Enter a Requests.. ' onChange={handleAddFormChange} /> <br/>
//                 <select  onChange={handleAddFormChange}>
//                     <option id='reqq'  value="Increase">Increase</option>
//                     <option    value="Decrease">Decrease</option>
//                 </select>

             
//                 <br></br>
//                 <button type='submit' > SEND </button>
//             </form>
//         </div>
        
//     );
//             }


function Sendreq() {
    const [requests, setRequests] = useState([]);
    const [addFormData, setAddFormData] = useState({
      userID: "",
      // Dates:"",
      quantity: "",
      productID: "",
      warehouseID: "",
      transaction: "",
      err: "",
      loading: false,
      success: null
    });
  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("Name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
    };
  
    const handleAddFormSubmit = (event) => {
      event.preventDefault();
  
      const newRequest = {
        userID: addFormData.userID,
        quantity: addFormData.quantity,
        productID: addFormData.productID,
        warehouseID: addFormData.warehouseID,
        transaction: addFormData.transaction
      };
  
      axios
        .post("http://localhost:8081/newReq/", newRequest)
        .then((res) => {
          setAddFormData({
            userID: "",
            quantity: "",
            productID: "",
            warehouseID: "",
            transaction: "",
            err: null,
            loading: false,
            success: "req send Successfully !"
          });
        })
        .catch((err) => {
          setAddFormData({
            ...addFormData,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !"
          });
        });
  
      const newRequests = [...requests, newRequest];
      setRequests(newRequests);
    };
  
    return (
      <div>
        <Topbar />
        <h2 className="Title"> New request </h2>
  
        <form onSubmit={handleAddFormSubmit}>
          <div className="req">
            <label htmlFor="id">User ID</label>
            <input
              id="id"
              type="text"
              name="userID"
              required="required"
              placeholder="Enter an ID.. "
              onChange={handleAddFormChange}
              value={addFormData.userID}
            />
            <br />
  
            <label htmlFor="stc">Quantity</label>
            <input
              id="stc"
              type="text"
              name="quantity"
              required="required"
              placeholder="Enter a Quantity.. "
              onChange={handleAddFormChange}
              value={addFormData.quantity}
            />
            <br />
  
            <label htmlFor="prdct">PRODUCTS</label>
            <input
              id="prdct"
              type="text"
              name="productID"
              required="required"
              placeholder="Enter a product.. "
              onChange={handleAddFormChange}
              value={addFormData.productID}
            />
            <br />
  
            <label htmlFor="war">WAREHOUSE</label>
            <input
              id="war"
              type="text"
              name="warehouseID"
              required="required"
              placeholder="Enter a Warehouse.. "
              onChange={handleAddFormChange}
              value={addFormData.warehouseID}
            />
            <br />
          </div>
  
      
  
          {/* <input
            className="reqq"
            id="reqq"
            type="text"
            name="transaction"
            required="required"
            placeholder="Enter a Requests.. "
            onChange={handleAddFormChange}
            value={addFormData.transaction}
          /> */}
              <label htmlFor="reqq">Requests</label>
          <br />
          <select
            value={addFormData.transaction}
            onChange={handleAddFormChange}
            name="transaction"
          >
            <option onChange={handleAddFormChange} value="Increase">Increase</option>
            <option onChange={handleAddFormChange} value="Decrease">Decrease</option>
          </select>
          <br />
          <button type="submit"> SEND </button>
        </form>
      </div>
    );
  
    }
  export default Sendreq;





