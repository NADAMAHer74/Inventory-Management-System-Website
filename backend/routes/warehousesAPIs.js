const router = require('express').Router();
const db = require("../db/dbConnection.js");
const admin = require("../middleware/admin");
const { body, validationResult } = require('express-validator');
const util = require("util");


//create warehouse
router.post("/",
admin,
body("name")
.isString()
.withMessage("please enter a valid warehouse name")
.isLength({min:5,max:20})
.withMessage("warehouse name should be between 5 and 20 characters"),


body("location")
.isString()
.withMessage("please enter a valid warehouse location")
.isLength({min:5})
.withMessage("warehouse location should be between 5 and 20 characters"),


body("status")
.isString()
.withMessage("please enter a valid warehouse status")
.isLength({min:6,max:9})
.withMessage("warehouse status should be between 6 and 9 characters"),


(req,res)=>{
    try{
    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors. array()}) ;

}
res.status(200).json({
msg: req.body,
}); 

const data = req.body;
db.query("insert into warehouses set ?",{
     name:data.name,
     location:data.location,
     status:data.status
     }, (error,results,fields)=>{
        if(error){
            res.statusCode =400;
            res.json({
                message:"FAILED TO SAVE",
            })
        }else{
            res.json({
                message:"WAREHOUSE CREATED",
            });
        }
});
}catch(error){
    console.log(error);
    res.status(500).json(error);
}
}
);




 





//get all warehouses
router.get("/",(req, res) => {

    db.query("select * from warehouses",(error,results,fields)=>{
        res.json(results);
    });
  });

  



//get spacific warehouse
router.get("/:id" , (req,res)=>{
    const {id} = req.params;
    db.query("select * from warehouses where ?" , {id:id} ,(error, results, fields)=>{
        if(results[0]){
            res.json(results);
        }else{
            res.statusCode =404;
            res.json({
                message:"WAREHOUSE NOT FOUND",
            });
        } 
    });
});


router.get('/read/:id', (req, res)=>{
    const sql ="SELECT * FROM warehouses WHERE id=?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) 
        return res.json({Massage: " error"});
       
        return res.json(result);
    })
})


//put request to update warehouse
router.put("/:id", async(req, res) => {
    const query = util.promisify(db.query).bind(db);
    const warehouse = await query("select * from warehouses where id =?", [
        req.params.id,
    ]);
    if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found" })
    }
    const { id } =req.params;
    const data = req.body;
    db.query("update warehouses set ? where ?",[{
        name : data.name,
        location : data.location,
        status : data.status,
    }, {id:id } ] , (error, results, fieldes)=>{
       
            

    });
}); 


    //delete request 
    router.delete("/:id", async( req, res ) => {
        try{

    
        const query = util.promisify(db.query).bind(db);
        const warehouse = await query("select * from warehouses where id =?", [
            req.params.id,
        ]);
        if (!warehouse[0]) {
            res.status(404).json({ ms: "warehouse not found" })
        }
        // const {id} = req.params;
        
            
            await query("delete from warehouses where id= ?", [
                warehouse[0].id]);

            res.status(200).json({
                msg: "warehouse deleted  ",
            });

        } catch (err) {
            res.status(500).json(err);
        }
    }

        );
        
  



    module.exports = router;
