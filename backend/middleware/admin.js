const db = require("../db/dbConnection.js");
const util = require("util");

const admin = async (req, res, next) => {

    const query = util.promisify(db.query).bind(db);
    const { token } = req.headers;
    const admin = await query("select * from users where token= ?", [token]);
    if (admin[0] && admin[0].type == "1") {
        next();
    } else {
        res.status(403).json({
            msg: "you aren't authorized to access this route",
        });
    }



};

module.exports = admin;