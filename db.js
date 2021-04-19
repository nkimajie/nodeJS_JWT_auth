const mysql = require('mysql');

module.exports = function(app){
    const dbconnect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node'
    });
    
    dbconnect.connect((err)=>{
        if(!err)
        console.log('Database conected successfully')
        else
        console.log('Database connection invalid')
    });
};