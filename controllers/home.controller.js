const productsModel = require('../models/products.model')


exports.getHome = (req,res,next) => {
    //get products and render the screen

   
    //get category if cat && not all then filter else render all 
    let category = req.query.category 
    let productpromise;
    let validcategories = ['animal','computers','phones']
    if (category && validcategories.includes(category))
        productpromise = productsModel.getProductByCategory(category)
    else  productpromise = productsModel.getAllProducts()

    productpromise.then((products)=>{
        // console.log(req.flash('ValidationErrors')[0])
        res.render('index',{
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            ValidationErrors: req.flash('ValidationErrors')[0],
        })
    })

}