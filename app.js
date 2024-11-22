const express = require('express') //express lai node_module  nata nikalera express vanne vadama rakhe
const app = express()


app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})

app.get('/',(req,res)=>{
   res.send("Radhe....!")
})

app.get('/about',(req,res)=>{
    res.send("This is about page.")
})