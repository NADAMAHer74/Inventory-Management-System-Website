const router = require("express").Router();
const db = require("../db/dbConnection.js");
const admin = require("../middleware/admin");


// router.get('/all', (req, res)=>{
//     const sql ="SELECT * FROM users";
//     db.query(sql, (err, data)=>{
//         if(err) 
//         return res.json({Massage: " error"});
       
//         return res.json(data);
//     })
// })

router.get('/getuser', (req, res)=>{
    const sqlGet ="SELECT `id`,`name`, `email`,`phone`, `warehouse_ID` FROM users";
    db.query(sqlGet, (err, result)=>{
        if(err) 
        return res.json({Massage: " error"});
       
        return res.json(result);
    })
})


router.post('/',admin, (req, res)=>{
    const sql= "INSERT INTO users(`name`, `email`,`phone`, `warehouse_ID' ) VALUES (?,?,?,?)";
    const values =[
        //req.body.id,
        req.body.name,
        req.body.email,
        //req.body.token,
        req.body.phone,
        req.body.warehouse_ID,


        // req.body.status,
        // req.body.type
        
    ]
    db.query(sql, values , (err, result)=>{
       if(err) 
       return res.json(err);

        return res.json(result);

    })
})

router.put('/:id',(req,res)=>{
    const sql= 'UPDATE users SET `email`=?, `password`=?,  `phone`=?, `warehouse_ID`=?, `name`=? WHERE `id`=? ';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, req.body.phone, req.body.status, req.body.type, id ],
    (err, result)=>{
        if(err)
        return res.json({Massage: " error"});
       
        return res.json(result);
    
    })

})

router.delete('/delete/:id', (req, res)=>{
    const sql = "DELETE FROM users WHERE id=?"
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>{
        if(err)
        return res.json({Massage: " error"});
       
        return res.json(result);
    })

})
module.exports = router;
