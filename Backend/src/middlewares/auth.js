const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.json({
            msg:"please signin first"
        })
    }
}

module.exports = auth;