// Yaha Databaseko configuration ko code hunxa
const databaseConfig = {
    db : process.env.DB,//in this way we access data from .env file
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    port : 13280,
    dialect : 'mysql'
}

module.exports = databaseConfig;  //exporting the database config to use in other files