const express = require('express') // use express to deal with server 
const path = require('path') // use path to work despite using linux / or windows  \ 
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authrouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const session = require('express-session')
const sessionstore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const app = express() // create object from express

app.use(express.static(path.join(__dirname,"assets"))) // identify the static files in asset
app.use(express.static(path.join(__dirname,"images")))

const STORE = new sessionstore({
    uri: 'mongodb://127.0.0.1:27017/shop-app',
    collection: 'sessions'
})
app.use(session({
    secret: 'this is my secret secret to hash express sessions ....',
    saveUninitialized: false,
    store:STORE
}))

app.use(flash())
// identify ejs to make templates to work on in html
app.set('view engine','ejs')
app.set('views','views') //default

app.use('/',homeRouter)
app.use('/',authrouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)


// listen server on port 3000
app.listen(3000,(err)=>{
    console.log("server listening on port 3000")
})