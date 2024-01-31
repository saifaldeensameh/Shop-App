const { Db } = require("mongodb");
const mongoose  = require("mongoose");
const bcrypt = require('bcrypt');
const { getProductByCategory } = require("./products.model");

const DB_URL = 'mongodb://127.0.0.1:27017/shop-app'


const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default: false
    } 
})

const User = mongoose.model('user',UserSchema)


exports.createNewUser = (username,email,password)=>{
    //check username
    //ifnotfound create new user
    // else error
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email});
        }).then((user)=>{
            if (user) {reject('email used')
        mongoose.disconnect()}
            else {
        return bcrypt.hash(password,10)
        } 
        }).then((hashedpassword)=>{
            let user = new User({
            username:username,
            email:email,
            password:hashedpassword 
        })
           return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(error=>{
            mongoose.disconnect()
            reject(error)
        } )
    })
}

exports.loginuser = (email,password)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then((founduser)=>{
            loginuser = founduser
            if(!loginuser) throw new Error ('email not correct')
            else return bcrypt.compare(password,loginuser.password)
        }).then((ismatch)=>{
            if(!ismatch) throw new Error('password not correct')
            else resolve({
                id: loginuser._id, isAdmin: loginuser.isAdmin})
        }).catch(err=>{
            reject(err.message)
        }).finally(()=>{
            mongoose.disconnect()
        })
    })
}