const express = require('express') //express lai node_module  nata nikalera express vanne vadama rakhe
const app = express()


app.set('view engine','ejs')//expresslai maile ejs use garna laako 
                          // yesko laagi required sabai environments(configuration) set garde vaneko 



app.get('/home',(req,res)=>{
   const data = {
      name:'Samyog',
      age: 21,
      location: 'khotang'
   }
   res.render("home.ejs",{
    data,
    
   })
})

app.get('/about',(req,res)=>{
    res.render("about.ejs")
})

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})