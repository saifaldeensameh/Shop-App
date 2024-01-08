const productsModel = require('../models/products.model')

exports.getProduct = (req,res,next)=>{
    //get id
    //get product
    //render
    let id = req.params.id
    productsModel.getProductByID(id).then((product)=>{
 
        res.render('product',{
            product:product
        })
    })
}