const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/shop-app'

const CartSchema = mongoose.Schema({
      name: String,
      price: Number,
      amount: Number,
      userId: String,
      productId: String,
      timestamp: Number,
})

const CartItem = mongoose.model('cart',CartSchema)

exports.addNewItem = (data)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            let item = new CartItem(data)
            return item.save()})
        .then(()=>{resolve()})
        .catch((err)=>{reject(err)})})
        .finally(()=>{
        mongoose.disconnect()
    })
}

exports.getItemtoCartbyUser = (userId) =>{

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.find({userId:userId},{},{sort:{timestamp:1}})
        }).then((item)=>{
            resolve(item)
        }).catch(err=>reject)
        .finally(()=>{  
            mongoose.disconnect()
        })
    })
}

exports.editItemInCart = (id,newData)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            return CartItem.updateOne({_id:id},newData)})
        .then((items)=>{resolve(items)})
        .catch((err)=>{reject(err)})})
        .finally(()=>{
        mongoose.disconnect()
    })
}

exports.deleteItemInCart = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=>{
            return CartItem.deleteOne({_id:id})})
        .then((items)=>{resolve(items)})
        .catch((err)=>{reject(err)})})
        .finally(()=>{
        mongoose.disconnect()
    })
}
