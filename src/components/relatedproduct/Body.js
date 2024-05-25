import React from 'react';
import './Body.css';
import Topbar from "../topbar/Topbar";

const Body = () => {
    return ( 
        <div className='content'>
            <Topbar/>
           {/* <div className='dash'>
           <h1>Dashboard<br/></h1> 
           <ul>
           <li>Log out</li>
            <li>Request message</li>
            <li>Show history</li>
           </ul>
           </div>
           <div className='view'><h3>ProductView</h3>
           <p>_____________________</p> */}
          
           <table className="related-table" >
           <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Photo</th>
        <th>Stock</th>
      </tr>
</thead> 
<tbody>

       {/* product.map((data,i)=>{
          <tr key={i}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.image_url}</td>
              <td>{data.stock}</td>

          </tr>
        }
        ); */}






</tbody>
    

  
</table> 
        </div>  
      
     );
};
 
export default Body;