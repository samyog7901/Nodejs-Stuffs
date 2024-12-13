require('dotenv').config()//ma dotenv use gariraxu sabai reqd config set garde vane
const express = require('express') //express lai node_module  bata nikalera express vanne vadama rakhe
const { blogs, sequelize } = require('./model/index')
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({ storage: storage })





const app = express()


// app.use(express.json())//yo chai primary arch.ko lagi 
app.use(express.urlencoded({extended :true}))//req.body ma data pani paryo(yo monolothic arch lai)
app.set('view engine','ejs')//expresslai maile ejs use garna laako yesko laagi required sabai environments(configuration) set garde vaneko 
                           
require("./model/index") //Database connection

app.get("/",async (req,res)=>{
    const datas = await blogs.findAll()//select * from blogs //data fetch garyo db ko tablebata ,findAll() returns array
    res.render("home",{blogs : datas})//home.ejs ma fetched data pass garyo
})

app.get("/blog/:id",async(req,res)=>{
    const id = req.params.id //id pakadyo
    const blog = await blogs.findByPk(id)//returns object
    res.render("singleBlog",{blog : blog})
})

app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id
    await blogs.destroy({where : {id : id}})//delete query
    res.redirect("/")
})

app.get("/create",(req,res)=>{
    res.render('create.ejs')//UI dekhaune code
})

//api
app.post("/create",upload.single('image'),async (req,res)=>{
   const filename = req.file.filename
   const {title, subtitle,description} = req.body
    await blogs.create({
        title,
        subtitle,
        description,
        image: filename
    })
    res.send("Blog added succesfully.")
})

app.use(express.static('public/css/'))//given access to content of public/css folder
app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})