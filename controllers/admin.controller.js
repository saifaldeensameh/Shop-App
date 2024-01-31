const cartModel = require('../models/cart.model')
const validationResult =require('express-validator').validationResult

exports.getAddProduct = (req,res,next)=>{
    
    res.render('add-product',{
        validationErrors: req.flash('ValidationErrors'),
        isUser:true,
        isAdmin:true
    });

}