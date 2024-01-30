const router = require('express').Router()
const authGuard =require('./guards/auth.guard')
const cartController = require('../controllers/cart.controller')
const bodyParser = require('body-parser')
const check = require('express-validator').check

router.get('/',authGuard.isauth,cartController.getCart)

router.post('/',authGuard.isauth,bodyParser.urlencoded({extended:true}),
    check('amount').not().isEmpty().withMessage('Amount Required').isInt({min:1}).withMessage('Amount Must be > 0'),
    cartController.postCart )


router.post('/save',authGuard.isauth,bodyParser.urlencoded({extended:true}),check('amount').not().isEmpty().withMessage('Amount Required').isInt({min:1}).withMessage('Amount Must be > 0'),cartController.postsaveitem)
router.post('/delete',authGuard.isauth,bodyParser.urlencoded({extended:true}),cartController.postdeleteitem)

module.exports = router