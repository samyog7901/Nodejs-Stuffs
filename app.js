require('dotenv').config()//ma dotenv use gariraxu sabai reqd config set garde vane
const express = require('express') //express lai node_module  bata nikalera express vanne vadama rakhe
const { blogs, sequelize, users } = require('./model/index')
// const multer = require('./middleware/multerConfig').multer
// const storage = require('./middleware/multerConfig').storage
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({ storage: storage })
const bcrypt = require("bcrypt")
const { homePage, singleBlog,deleteBlog, updateBlog, createForm, createBlog } = require('./controller/blogController')
const { registerUser, loginUser, renderRegister, renderLogin } = require('./controller/authController')




const app = express()


// app.use(express.json())//yo chai primary arch.ko lagi 
app.use(express.urlencoded({extended :true}))//req.body ma data pani paryo(yo monolothic arch lai)
app.set('view engine','ejs')//expresslai maile ejs use garna laako yesko laagi required sabai environments(configuration) set garde vaneko 
                           
require("./model/index") //Database connection

app.get("/",homePage)

app.get("/blog/:id",singleBlog)

app.get("/delete/:id",deleteBlog)

app.get("/update/:id",updateBlog)
app.post('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const {title, subtitle,description} = req.body 

    try {

        await blogs.update({
            title  ,
            subtitle,
            description
        },{
            where : {
                id : id
            }
        })

        // Redirect back to the blog's details page (or wherever you want)
        res.redirect(`/blog/${id}`); 
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Failed to update blog.' }); 
    }
}); 

app.get("/create",createForm)
//api
app.post("/create",upload.single('image'),createBlog)

app.get("/register",renderRegister)
app.post("/register",registerUser)

app.get("/login",renderLogin)
app.post("/login",loginUser)


app.use(express.static('public/css/'))//given access to content of public/css folder
app.use(express.static('./storage/'))

app.listen(3000,()=>{
    console.log("Prem se Bolo Radhe Radhe!")
})