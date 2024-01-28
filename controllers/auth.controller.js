const authmodel = require('../models/auth.model')

exports.getSignup = (req,res,next)=>{
    
    res.render('signup')

}

exports.postSignup = (req,res,next)=>{
    authmodel.createNewUser(req.body.username,req.body.email,req.body.password).then(()=>{
        res.redirect('/login')}).catch(err=>res.redirect('/signup'))
    
    // res.render('signup')


}

exports.getLogin = (req,res,next)=>{
    res.render('login',{
        authError: req.flash('authError')[0]
    });

}

exports.postLogin = (req,res,next)=>{
    authmodel.loginuser(req.body.email,req.body.password)
    .then((id)=>{
        req.session.useId = id 
        res.redirect('/')})
    .catch((error)=>{
        req.flash('authError',error)
        res.redirect('login')
    })
}

exports.logout = (req,res,next) => {
    return req.session.destroy(()=>{
        res.redirect('/')
    })
} 