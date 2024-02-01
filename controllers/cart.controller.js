const { render } = require('ejs')
const cartModel = require('../models/cart.model')
const validationResult =require('express-validator').validationResult

exports.getCart = (req,res,next) =>{
    cartModel.getItemtoCartbyUser(req.session.userId).then((items)=>{
        res.render('cart',{
            items:items,
            isUser:true,
            isAdmin:req.session.isAdmin,
            pageTitle:'Cart',

        })
    })
} 

exports.postCart = (req,res,next)=>{
    if (validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            userId : req.session.userId,
            productId : req.body.productId,
            timestamp : Date.now()

        }).then(()=>{
            res.redirect('/cart')
        }).catch(err=>{
            console.log(err)
        })
    }
    else{
        req.flash('ValidationErrors',validationResult(req).array())
        res.redirect(req.body.redirectto)
    }
}

exports.postsaveitem =(req,res,next) =>{
    if (validationResult(req).isEmpty()){
        cartModel.editItemInCart(req.body.cartId,{amount:req.body.amount,
            timestamp:Date.now()})
        .then(()=>{res.redirect('/cart')})
        .catch(err=>console.log(err))
    }
    else{
        req.flash('ValidationErrors',validationResult(req).array())
        res.redirect('/cart')
    }

}

exports.postdeleteitem = (req,res,next)=>{
    if (validationResult(req).isEmpty()){
        cartModel.deleteItemInCart(req.body.cartId)
        .then(()=>{res.redirect('/cart')})
        .catch(err=>console.log(err))
    }
    else{
        req.flash('ValidationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}