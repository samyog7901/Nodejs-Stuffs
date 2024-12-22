require('dotenv').config()//ma dotenv use gariraxu sabai reqd config set garde vane
const express = require('express') //express lai node_module  bata nikalera express vanne vadama rakhe
const { blogs, sequelize, users } = require('./model/index')
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage





const app = express()
const blogRoute = require("./routes/blogRoute")
const authRoute = require("./routes/authRoute")


// app.use(express.json())//yo chai primary arch.ko lagi 
app.use(express.urlencoded({extended :true}))//req.body ma data pani paryo(yo monolothic arch lai)
app.set('view engine','ejs')//expresslai maile ejs use garna laako yesko laagi required sabai environments(configuration) set garde vaneko 
                           
require("./model/index") //Database connection
                         // http://localhost:3000 + /create
app.use('/',blogRoute)//Route linked(means route concatenetion)
app.use('/',authRoute)


app.use(express.static('public/css/'))//given access to content of public/css folder
app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})