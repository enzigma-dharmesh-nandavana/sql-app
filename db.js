require('dotenv').config();
const Connection = require('tedious').Connection;
const config = {
    server: process.env.DB_HOST,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER, //update me
            password: process.env.DB_PASSWORD  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.DB_DATABASE  //update me
    }
};
var connection = new Connection(config);


connection.on('connect', function () {
    console.log("Connected");
})

connection.connect();

module.exports = connection;