const router = require('express').Router()
const check = require('express-validator').check

const adminController = require('../controllers/admin.controller')
const adminGuard = require('../routes/guards/admin.guard')

router.get('/add',adminGuard.isAdmin,adminController.getAddProduct)
module.exports = router