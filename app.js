const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('./db');
const bodyparser = require('body-parser');

//import routes
const authRoute = require('./routes/auth');


//connect to database
mysql(app);


//middlewares
app.use('/api/user', authRoute);
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.post('/register', (req, res)=>{
    console.log(req.body)
})

//start server
app.listen(3000, () => console.log('Server is up and running on http://localhost:3000'));