const db = require("../db/dbConnection.js");
const util = require("util");

const authorized = async (req, res, next) => {

    const query = util.promisify(db.query).bind(db);
    
    const { token } = req.headers;
    const user = await query("select * from users where token= ?", [token]);
    if (user[0]) {
        res.locals.user = user[0];
        next();
    } else {
        res.status(403).json({
            msg: "you aren't authorized to access this route",
        });
    }



};

module.exports = authorized;