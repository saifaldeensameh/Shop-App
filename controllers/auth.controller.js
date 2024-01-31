const authmodel = require('../models/auth.model')
const validationresult = require('express-validator').validationResult
exports.getSignup = (req,res,next)=>{
    
    res.render('signup',{
        ValidationErrors: req.flash('ValidationErrors'),
        isUser:false

    })

}

exports.postSignup = (req,res,next)=>{

    // return console.log(validationresult(req))
    if (validationresult(req).isEmpty()){
    authmodel.createNewUser(req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect('/login')}).catch(err=>res.redirect('/signup'))
    }
    else{
        req.flash('ValidationErrors',validationresult(req).array())
        res.redirect('signup')
    }


}

exports.getLogin = (req,res,next)=>{
    
    res.render('login',{
        authError: req.flash('authError')[0],
        loginValidationErrors: req.flash('loginValidationErrors'),
        isUser:false
    });

}

exports.postLogin = (req,res,next)=>{
    if (validationresult(req).isEmpty()){
    
    authmodel.loginuser(req.body.email,req.body.password)
    .then((result)=>{
        req.session.userId = result.id 
        req.session.isAdmin = result.isAdmin
        res.redirect('/')})
    .catch((error)=>{
        req.flash('authError',error)
        res.redirect('login')
    })
    }
    else{
        req.flash('loginValidationErrors',validationresult(req).array())
        res.redirect('login')
    }
}

exports.logout = (req,res,next) => {
    return req.session.destroy(()=>{
        res.redirect('/')
    })
} 