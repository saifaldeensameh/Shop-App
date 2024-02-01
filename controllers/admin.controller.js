const productModel = require('../models/products.model')
const validationResult =require('express-validator').validationResult

exports.getAddProduct = (req,res,next)=>{
    
    res.render('add-product',{
        validationErrors: req.flash('ValidationErrors'),
        isUser:true,
        isAdmin:true,
        pageTitle:'Add-Product',

    });

}

exports.postAddProduct = (req,res,next)=>{
    if (validationResult(req).isEmpty()){
        req.body.image = req.file.filename
        productModel.addNewProduct(req.body)
        .then(()=>{
            req.flash('added',true)
            res.redirect('/admin/add')
        })
        .catch(err=>{
           next(err)
        })
    }
    else {
            req.flash('validationErrors',validationResult(req).array())
            res.redirect('/admin/add')
    }
    
    
}