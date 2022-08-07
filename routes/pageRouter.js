const Router = require("express").Router()
const { authenticateTokenPages } = require("./../helpers")

Router.get('/login', (req,res,next) =>{
    res.render("login")
})

Router.get('/register', (req,res,next) =>{
    res.render("register")
})

Router.get('/home', (req,res,next) =>{
    res.render("index")
})


module.exports = Router