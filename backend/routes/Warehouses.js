const router = require("express").Router();
const db = require("../db/dbConnection.js");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require('express-validator');
const upload = require("../middleware/uploadImages");
const util = require("util");
const fs = require("fs");


router.get("/",(req,res) => {
    const sqlGet = "SELECT * FROM warehouses";
    db.query(sqlGet, (err, data) => {
       
         res.send( data);
       
    })
  
})
//admin
//create

router.post(
    "/",
    admin,
    body("name")
        .isString()
        .withMessage("please enter a valid warehouse "),
       

    body("location")
        .isString()
        .withMessage("please enter a valid location "),
       
     body("status")
     .isInt()
     .withMessage("please enter a valid status "),
   
    async (req, res) => {
        try {

            //validation  request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // prepare product object
            const warehouse = {
                name: req.body.name,
                location: req.body.location,
            
                status:req.body.status,
               
            };
            // insert product into db
            const query = util.promisify(db.query).bind(db);
            await query("insert into warehouses set ?", warehouse);




            res.status(200).json({
                msg: "warehouse created successfully",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);




//delete
router.delete(
    "delete/:id",
    admin,
    async (req, res) => {
        try {
            //check if product exists or not
            const query = util.promisify(db.query).bind(db);
            const product = await query("select * from products where id =?", [
                req.params.id,
            ]);
            if (!product[0]) {
                res.status(404).json({ msg: "product not found" });
            }
            // remove product image

            //delete old image
            fs.unlinkSync("./upload/" + product[0].image_url);

            await query("delete from products where id= ?", [
                product[0].id]);

            res.status(200).json({
                msg: "product deleted  ",
            });

        } catch (err) {
            res.status(500).json(err);
        }
    }
);


//user list / search
router.get("", async (req, res) => {
    const query = util.promisify(db.query).bind(db);
    const product = await query("select * from products");
    product.map((pr) => {
        pr.image_url = "http://" + req.hostname + ":4000/" + pr.image_url;
    });
    res.status(200).json(product);
});
// show product admin/user
router.get("/:id", async (req, res) => {
    const query = util.promisify(db.query).bind(db);
    const product = await query("select * from products where id=?", [
        req.params.id,
    ]);
    if (!product[0]) {
        res.status(404).json({ msg: "product not found" });
    }
    product[0].image_url = "http://" + req.hostname + ":4000/" + product[0].image_url;
    res.status(200).json(product[0]);
});



//user  reveiw
router.post("/review", authorized,
    body("product_id").isNumeric().withMessage("please enter valid id"),
    body("review").isString().withMessage("please enter valid review"),

    async (req, res) => {
        try {
            const query = util.promisify(db.query).bind(db);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const product = await query("select * from products where id =?", [
                req.body.product_id,
            ]);
            if (!product[0]) {
                res.status(404).json({ ms: "product not found" });
            }

            const reviewObj = {
                user_id: res.locals.user.id,
                product_id: product[0].id,
                review: req.body.review,

            };

            await query("insert into  user_product_review set ?", reviewObj);

            res.status(200).json({
                msg: "review added successfuly",

            });
        } catch (err) {
            res.status(500).json(err);
        }

    });




module.exports = router;
