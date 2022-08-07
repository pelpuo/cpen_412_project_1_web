const Router = require("express").Router()

const User = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {body, header} = require("express-validator")

const {authenticateToken} = require("./../helpers")

// Login User
Router.post("/login",
    body("email").exists().isEmail(),
    body("password").exists().isLength({min: 6}),
    async (req, res, next) => {
    try {
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        })

        if(!user){
            return res.status(400).send({success: false, message:"User not found"})
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordIsValid){
            return res.status(400).send({success: false, error:"invalid password"})
        }

        // jwt
        let token = jwt.sign({
            userId: user.id, email: user.email
        }, process.env.SECRET)

        return res.status(200).json({success:true, data:{
            userId: user.id,
            email: user.email,
            token: token
        }})

    } catch (error) {
        return res.status(500).json({success: false, message:error})
    }
});

// Register User
Router.post("/register", 
    body("email").exists().isEmail(),
    body("password").exists().isLength({min: 6}),
    body("first_name").exists().isString(),
    body("last_name").exists().isString(),
    async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(200).json({"success":true, "user": newUser})
    } catch (error) {
        res.status(400).json({success: false, error:error})
    }
});

// Logout User
// Router.get("/logout", async (req, res, next) => {
//     res.status(200).json({'msg':"logout route"})
// });

Router.get("/users", authenticateToken, async (req, res) =>{
    try{
        const users = await User.findAll()
        res.status(200).json({success:true, users:users})
    }catch(e){
        res.status(400).json({success:false, error:e})
    }
})

// Router.get("/req", async(req,res)=>{
//     res.status(200).json(req.headers["authorization"])
// })


module.exports = Router