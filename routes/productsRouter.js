const Router = require("express").Router()
const Product = require("./../models/Product")
const { authenticateToken } = require("./../helpers")
const {body, header} = require("express-validator")


Router.get("/", authenticateToken, async (req, res, next) =>{
    try {
        const products =  await Product.findAll();     
        res.status(200).json(products);  
    } catch (error) {
        res.status(500).json({error:error})
    }
})

Router.get("/:id", authenticateToken, async (req, res, next) =>{
    try {
        const product =  await Product.findOne({
            where:{
                id:req.params.id
            }
        });     
        res.status(200).json(product);  
    } catch (error) {
        res.status(500).json({error:error})
    }
})

Router.post("/", 
    body("name").exists().isString(),
    body("quantity").exists().isNumeric(),
    body("price").exists().isNumeric(),
    authenticateToken, async (req, res, next) =>{
    try {
        const newProduct = await Product.create({
            name:req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image_url: req.body.image_url
        })     

        res.status(201).json({success:true, data:{product: newProduct}});  
    } catch (error) {
        res.status(500).json({error:error})
    }
})

Router.patch("/:id", authenticateToken, async (req, res, next) =>{
    try {
        const editedProduct = await Product.update({
            name:req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image_url: req.body.image_url
        }, {
            where: {id:req.params.id}
        })

        return res.status(203).json({success: true, data:{
            updatedProduct: editedProduct
        }})

    } catch (error) {
        return res.status(500).json({error});
    }
})

Router.delete("/:id", authenticateToken, async (req, res, next) =>{
    try {
        await Product.destroy({
            where:{id: req.params.id}
        })
        res.status(204).json({success: true})
    } catch (error) {
        res.status(500).json({success:false, error: error})
    }
})

module.exports = Router