const { promiseImpl } = require('ejs')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/shop-app'

const ProductSchema = mongoose.Schema({
      name: String,
      image: String,
      price: Number,
      description: String,
      category: String
  
})

const Product = mongoose.model('product',ProductSchema) 

exports.getAllProducts = () =>{
    
    return new Promise ((resolve , reject)=>{
    mongoose.connect(DB_URL).then(()=>{

        return Product.find({})
    }).then((products)=>{
        mongoose.disconnect()
        resolve(products)

    }).catch(err=>reject)
})
}

exports.getProductByCategory = (category)=>{
    return new Promise ((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category:category})
        }).then((products)=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err =>reject)

    })
}

exports.getProductByID = (id)=>{
    return new Promise ((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findOne({'_id':id})
        }).then((products)=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err =>reject)

    })
}