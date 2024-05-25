
const express = require("express");
const cors = require("cors");

const product = require("./routes/Product");
const auth= require("./routes/Auth"); 
const user= require("./routes/User");
const warehouses = require('./routes/warehousesAPIs');
const newReq = require("./routes/NewReq");


const db = require("./db/dbConnection");

const App = express ();
App.use(express.json());
App.use(express.urlencoded({extended: true}));
App.use(express.static("upload"));
App.use(cors());
App.use(express.json())


App.listen(8081, ()=>{
    console.log("server is running");
});

App.use("/product", product) ;  
App.use("/auth", auth)  ;
App.use("/user", user)  ;
App.use("/warehouses",warehouses);
App.use("/newReq",newReq);
