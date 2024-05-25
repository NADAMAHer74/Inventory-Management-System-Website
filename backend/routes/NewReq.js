const router = require("express").Router();
const db = require("../db/dbConnection");
const util = require("util");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin"); 

//======USER SEND REQUEST TO ADMIN ======//

router.post("/", async (req, res) => {

    const { productID,userID ,quantity,warehouseID,transaction} = req.body;
  
    if (!userID) {
      return res.status(400).json({
        msg: "Invalid request",
      });     
    }

    const query = util.promisify(db.query).bind(db);
  
    try {
      const [user] = await query("SELECT * FROM users WHERE id = ?", [userID]);

      if (!user) {
        return res.status(404).json({
          msg: "User not found",
        });
      } 
   
     // const [existingRequest] = await query(
      //   "SELECT * FROM requests WHERE userID = ? AND status = 'pending'",
      //   [userID]
      // );
  
      // if (existingRequest) {
      //   return res.status(400).json({
      //     msg: "Request already exists",
      //   });  
      // }
  
      // const productID = uuidv4();
  
      await query("INSERT INTO requests (userID,  productID ,warehouseID,quantity,status,transaction) VALUES (?,?,?,?,?,?)", [
        userID,
        productID,
        warehouseID,
        quantity,
        "pending",
        transaction,
        
      ]);
  
      return res.status(200).json({
        msg: "Request sent",
        productID: productID,
        warehouseID:warehouseID,
        quantity:quantity,
        transaction:transaction
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Server error",
      });
    }
  });



//====== ADMIN APPROVE OF REQUEST USER ======//

router.get('/', (req, res)=>{
  const sql ="SELECT * FROM requests";
  db.query(sql, (err, data)=>{
      if(err) 
      return res.json({Massage: " error"});
     
      return res.json(data);
  })
}
)


  //hostory for spesific user 
  router.get("/recivesuper",authorized,async (req,res)=>{ 
    const data = { 
        mail:res.locals.user.userID ,
    }
    const query = util.promisify(conn.query).bind(conn);
    const requests = await query("select * from requests where userID = ?" , data.mail)
    
        res.status(200).json(requests)
  })


  //response accepted or declined
  router.put("/:id",async(req,res)=>{
    try{
    const query = util.promisify(conn.query).bind(conn);
    const mail = await query("select * from requests where id = ?",[req.params.id]);
    if(!mail[0]){
     res.status(404).json({msg:"product not found"});
    }
    const response={
        response : req.body.response
    }
    await query("update requests set ? where id = ? ",[response, mail[0].id])
     const userID = await query("select * from requests where id = ?",[req.params.id]);
    // await query("insert into report set ?",userID) 
    const OrderQuantity = await query("select * from requests where id = ?",[req.params.id]);
    const TableProduct = await query("select * from product where id=? and warehouseID = ?",[mail[0].product_id , mail[0].warehouseID]);
    let sum;
    if(OrderQuantity[0].response == 'accepted'){
        if(OrderQuantity[0].transaction == 'increase'){
            sum = OrderQuantity[0].quantity + TableProduct[0].quantity ; 
        }
        else{
            sum = TableProduct[0].quantity - OrderQuantity[0].quantity  ; 
            if(sum<0){
                sum=0;
            }
        }
    } 
    else{
        sum = TableProduct[0].quantity;
    } 
    const newQuantityProduct = {
        quantity : sum
    } 
    await query("update product set ? where id = ? ",[newQuantityProduct, mail[0].product_id])
    res.status(200).json({msg:'product deleted successfuly',})
    }
    catch(err){ 
        console.log(err);
        res.status(500).json(err) 
    }
    })
  router.delete("/:id", 
    async(req,res)=>{
    try{
    const query = util.promisify(conn.query).bind(conn);
    const userID = await query("select * from requests where id = ?",[req.params.id]);
    if(!userID[0]){
     res.status(404).json({msg:"product not found"});
    }
    await query("delete from requests where id = ? ",[userID[0].id])
    res.status(200).json({msg:'userID deleted successfuly',})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err) 
    }
    });
  
  




  module.exports = router;