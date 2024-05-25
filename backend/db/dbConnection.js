const mysql = require("mysql");



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database:"edaradash",
    port: "3306"
});

db.connect((err) =>{
   
    
    console.log("db connected");
})


module.exports = db;
