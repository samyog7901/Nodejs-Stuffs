const express = require('express') //express lai node_module  bata nikalera express vanne vadama rakhe
const app = express()
require('dotenv').config()//ma dotenv use gariraxu sabai reqd config set garde vane
app.set('view engine','ejs')//expresslai maile ejs use garna laako yesko laagi required sabai environments(configuration) set garde vaneko 
                           
require("./model/index") //Database connection



app.get('/home',(req,res)=>{
   const data = {
      name:'Samyog',
      age: 21,
      location: 'khotang'
   }
   const nepal = {
    country :'Nepal',
    continent : 'Asia',
    nickName : 'Land of Himalayas'

   }

   res.render("home.ejs",{
    ram : data,
    laxman : nepal
    
   })
})

app.get('/about',(req,res)=>{
    res.render("about.ejs")
})

app.use(express.static('public/css/'))//given access to content of public/css folder

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})