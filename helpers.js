require("dotenv").config
const jwt = require("jsonwebtoken")

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    // const token = authHeader && authHeader.split(" ")[1]
    token = authHeader

    console.log(token)

    if(token == null){
        return res.status(401).json({message: "invalid token"})
    } 

    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)

        req.user = user
        next();
    })
}


exports.authenticateTokenPages = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    // const token = authHeader && authHeader.split(" ")[1]
    token = authHeader

    console.log(token)

    if(token == null){
        return res.redirect("/login")
    } 

    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)

        req.user = user
        next();
    })
}