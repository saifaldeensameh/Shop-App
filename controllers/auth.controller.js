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
    res.render('login')

}

exports.postLogin = (req,res,next)=>{
    authmodel.loginuser(req.body.email,req.body.password)
    .then((id)=>{
        console.log('hahaahhha',id)
        req.session.useId = id 
        res.redirect('/')})
    .catch((error)=>{res.render('login')
    })
}

exports.logout = (req,res,next) => {
    return req.session.destroy(()=>{
        res.redirect('/')
    })
} 