// Importing dependencies
require("dotenv").config
const express = require("express")
const cors = require("cors")
const path = require('path')

// Importing routers
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");
const pageRouter = require("./routes/pageRouter");

const app = express()

// Adding middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/public", express.static(path.join(__dirname,"public")))
app.set('views', './views')
app.set('view engine', 'ejs')


// Adding routers
app.use("/", pageRouter)
app.use("/api/v1", authRouter)
app.use("api/v1/products", productsRouter)

// DB connection
const sequelize = require("./db")
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err))

const PORT = process.env.PORT || 4000;


app.get("/", (req, res)=>{
    res.redirect("/home")
})


app.get("*", (req, res)=>{
    res.json({"msg":"route not found"})
})

app.listen(PORT, () =>{
    console.log(`App started on ${PORT}`)
})

