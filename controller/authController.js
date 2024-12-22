const { blogs, users } = require("../model")
const bcrypt = require("bcrypt")

exports.renderRegister = (req,res)=>{
    res.render("register")
}
exports.registerUser = async(req,res)=>{
    const {username,email,password} = req.body
    await users.create({
        username,
        email,
        password : bcrypt.hashSync(password,10) 
    })
    res.redirect("/login")
}

// getMethod
exports.renderLogin = (req,res)=>{
    res.render("login")
}
// postMethod
exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    // check whether that email exist or not in users table
   const data = await users.findAll({
        where : {
            email : email
        }

    })
    if(data.length == 0){
        res.send("No user with that email")
    }else{
        // now check password
        const hashedPassword = data[0].password
        const isMatch = bcrypt.compareSync(password,hashedPassword)
        if(isMatch){
            res.send("logged in success!")
        }
        else{
            res.send("Invalid password!")
        }
    }
}