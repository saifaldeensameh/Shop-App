const productsModel = require('../models/products.model')

exports.getProductByID = (req,res,next)=>{
    //get id
    //get product
    //render
    let id = req.params.id
    productsModel.getProductByID(id).then((product)=>{
 
        res.render('product',{
            product:product,
            isUser:req.session.isUser,
            isAdmin:req.session.isAdmin


        })
    })
}

exports.getfirstProduct = (req,res,next)=>{
    //get product
    //render
    productsModel.getfirstProduct().then((product)=>{
 
        res.render('product',{
            product:product,
            isUser:req.session.isUser,
            isAdmin:req.session.isAdmin

        })
    })
}