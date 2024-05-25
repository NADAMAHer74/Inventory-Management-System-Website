import React, {useState, useEffect} from 'react';
import WarehouseModule from './WarehouseModule';
import './style/WarehouseList.css';
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const WarehouseList = () => {
    const auth = getAuthUser();
    // const warehouseData=data;
    const [data, setData]= useState([]);
     useEffect(()=>{
         axios.get('http://localhost:8081/warehouses')
         .then(res => setData(res.data))
         .catch(err => console.log(err))
 
 },[])
 

 
const DisplayWarehouses =() =>{  
            return data.map(data =>{
                    return(
                        <WarehouseModule
                        key={data.id}
                        id={data.id}
                        name={data.name} 
                        location={data.location} 
                        status={data.status}
                        />
                    );
                });
            };



        return <div className='warehouseList'>{
            data.length > 0 ?  DisplayWarehouses() : <p>There is no warehouses</p>
            }</div>;
    
};
 
export default WarehouseList;