
const Connection = require('tedious').Connection;
const config = {
    server: 'newtestabx.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'test', //update me
            password: 'Vijay@123'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'nodedbtestnew'  //update me
    }
};
var connection = new Connection(config);


connection.on('connect', function () {
    console.log("Connected");
})

connection.connect();

module.exports = connection;