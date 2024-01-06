const productsModel = require('../models/products.model')


exports.getHome = (req,res,next) => {
    //get products and render the screen

    productsModel.getAllProducts().then(products=>{
        res.render('index'
        ,{
            products: products
        })
    })

}