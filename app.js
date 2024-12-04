require('dotenv').config()//ma dotenv use gariraxu sabai reqd config set garde vane
const express = require('express') //express lai node_module  bata nikalera express vanne vadama rakhe
const { blogs } = require('./model/index')
const app = express()


// app.use(express.json())//yo chai primary arch.ko lagi 
app.use(express.urlencoded({extended :true}))//req.body ma data pani paryo(yo monolothic arch lai)
app.set('view engine','ejs')//expresslai maile ejs use garna laako yesko laagi required sabai environments(configuration) set garde vaneko 
                           
require("./model/index") //Database connection

app.get("/create",(req,res)=>{
    res.render('create.ejs')//UI dekhaune code
})

app.post("/create",async (req,res)=>{
   const {title, subtitle,description} = req.body
    await blogs.create({
        title,
        subtitle,
        description
    })
    res.send("Blog added succesfully.")
})

app.use(express.static('public/css/'))//given access to content of public/css folder

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})