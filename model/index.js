//Database Connection
const  {Sequelize,DataTypes} = require('sequelize')
const databaseConfig = require('../config/dbConfig')
const makeBlogTable = require('./blogModel')
const makeUserTable = require('./userModel')


const sequelize = new Sequelize(databaseConfig.db,databaseConfig.username,databaseConfig.password,{
    host : databaseConfig.host,
    port : databaseConfig.port,
    dialect : databaseConfig.dialect,
    operatorsAliases : false,
    pool :{
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
})

sequelize.authenticate()
.then(()=>{
    console.log('database connected')
})
.catch((err)=>{
    console.log("error aayo hai",err)
})

const db = {}
db.Sequelize = Sequelize //naksa(class) ra
db.sequelize = sequelize//ghar lai db vanne object ma rakheko


db.blogs = makeBlogTable(sequelize,DataTypes) //function call
db.users = makeUserTable(sequelize,DataTypes)

db.sequelize.sync({force : false}).then(()=>{
    console.log('Synced done!!')
})

module.exports = db 