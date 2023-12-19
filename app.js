const express = require('express') // use express to deal with server 
const path = require('path') // use path to work despite using linux / or windows  \ 

const app = express() // create object from express

app.use(express.static(path.join(__dirname,"assets"))) // identify the static files in asset
// identify ejs to make templates to work on in html
app.set('view engine','ejs')
app.set('views','views') //default


app.get('/',(req,res,next)=>{
    res.render('index')

})



// listen server on port 3000
app.listen(3000,(err)=>{
    console.log(err)
    console.log("server listening on port 3000")
})