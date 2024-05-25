const router = require("express").Router();
const db = require("../db/dbConnection.js");
const { body, validationResult } = require('express-validator');
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// const { Delete } = require("@mui/icons-material");

//LOGIN
router.post(
    "/login",
    body("email").isEmail().withMessage("please enter valid email"),
    body("password").isLength({ min: 5, max: 10 })
        .withMessage("password should be between 8 to 10"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            const query = util.promisify(db.query).bind(db);
            const user = await query(
                " select * from users where email = ?",
                [req.body.email,]);

            if (user.length == 0) {
                res.status(404).json({
                    errors: [
                        {
                            msg: "email or password not found",
                        },
                    ],
                });

            }
            // compare password
            const checkPassword = await bcrypt.compare
                (req.body.password,
                    user[0].password
                );
            if (checkPassword) {
                delete user[0].password;
                res.status(200).json(user[0])
            } else {
                res.status(404).json({
                    errors: [
                        {
                            msg: "email or password not found",
                        },
                    ],
                });
            }
            


            // //3 prepare user to save
            // const userData = {
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: await bcrypt.hash(req.body.password,10), 
            //     token: crypto.randomBytes(16).toString("hex"),

            // };


            // //4 insert user object into db
            // await query("insert into users set ?", userData);
            // delete userData.password;

            // res.status(200).json(userData);


        } catch (err) {
            res.status(500).json({ err: err });
        }

    }
);








//reGISTER
router.post(
    "/register",
    body("email").isEmail().withMessage("please enter valid email"),
    body("name")
        .isString()
        .withMessage("please enter valid name")
        .isLength({ min: 10, max: 20 })
        .withMessage("name should be between 10 to 20"),
    body("password").isLength({ min: 8, max: 10 })
        .withMessage("password should be between 8 to 10"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            const query = util.promisify(db.query).bind(db);
            const checkEmailExists = await query(
                " select * from users where email = ?",
                [req.body.email]);

            if (checkEmailExists.length > 0) {
                res.status(400).json({
                    errors: [
                        {
                            msg: "email is already exist!",
                        },
                    ],
                });

            }
            //3 prepare user to save
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                token: crypto.randomBytes(16).toString("hex"),

            };


            //4 insert user object into db
            await query("insert into users set ?", userData);
            delete userData.password;

            res.status(200).json(userData);


        } catch (err) {
            res.status(500).json({ err: err });
        }

    }
);





module.exports = router;
