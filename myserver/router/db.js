var mysql=require('mysql');

var connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:'root',
    password:'khu147',
    database : 'myproject'
});

connection.connect();

module.exports=connection;