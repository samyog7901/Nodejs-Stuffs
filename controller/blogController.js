const { blogs } = require("../model")

exports.homePage = async (req,res)=>{
    const datas = await blogs.findAll()//select * from blogs //data fetch garyo db ko tablebata ,findAll() returns array
    res.render("home",{blogs : datas})//home.ejs ma fetched data pass garyo
}

exports.singleBlog = async(req,res)=>{
    const id = req.params.id //id pakadyo
    const blog = await blogs.findByPk(id)//returns object
    res.render("singleBlog",{blog : blog})
}

exports.deleteBlog = async(req,res)=>{
    const id = req.params.id
    await blogs.destroy({where : {id : id}})//delete query
    res.redirect("/")
}

exports.updateBlog = async(req,res)=>{
    const id = req.params.id 
    const blog = await blogs.findAll({
        where : {
            id : id
        }
    })
    res.render("editBlog",{blog : blog})

}

exports.createForm = (req,res)=>{
    res.render('create.ejs')//UI dekhaune code
}

exports.createBlog = async (req,res)=>{
    const filename = req.file.filename
    const {title, subtitle,description} = req.body
     await blogs.create({
         title,
         subtitle,
         description,
         image: filename
     })
     res.send("Blog added succesfully.")
 }
