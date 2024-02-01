const router = require('express').Router()
const check = require('express-validator').check
const multer = require('multer')

const adminController = require('../controllers/admin.controller')
const adminGuard = require('../routes/guards/admin.guard')

router.get('/add',adminGuard.isAdmin,adminController.getAddProduct)
router.post('/add',adminGuard.isAdmin,multer({
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'images')
        },
        filename: (req,file,cb)=>{
            cb(null, Date.now()+file.originalname)
        },
    })
}).single('image'),
check('image').custom((value,{req})=>{
    if (req.file) return true
    else throw "Image is Required"
}),adminController.postAddProduct)


module.exports = router