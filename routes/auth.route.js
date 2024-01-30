const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check
const authGuard = require('./guards/auth.guard')
const authController = require('../controllers/auth.controller')


router.get('/signup',authGuard.isnotauth,authController.getSignup)

router.post('/signup',authGuard.isnotauth,
            bodyParser.urlencoded({extended: true}),
            check('username').not().isEmpty().withMessage("Username can't be Empty"),
            check('email').not().isEmpty().withMessage("Email can't be Empty")
            .isEmail().withMessage('Please Enter Correct format of Email xxxx@xxx.xx'),
            check('password').isLength({min:6}).withMessage('Password Length Should > 6 characters'),
            check('confirm_password').custom((value,{req})=>{
                if (value === req.body.password){
                    return true;
                }
                else {
                    throw "Password Doesn't Match";
                }
            }),
            authController.postSignup)

router.get('/login',authGuard.isnotauth,authController.getLogin)            

router.post('/login',authGuard.isnotauth,
            bodyParser.urlencoded({extended:true}),
            check('email').not().isEmpty().withMessage("Email can't be Empty"),
            check('password').isLength({min:6}).withMessage('Password Length Should > 6 characters'),
            authController.postLogin)

router.all('/logout',authGuard.isauth,authController.logout)            
module.exports = router
