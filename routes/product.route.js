const router = require('express').Router()


const productController = require('../controllers/product.controller')

router.get('/',productController.getfirstProduct)
router.get('/:id',productController.getProductByID)


module.exports = router