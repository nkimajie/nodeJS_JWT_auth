const bodyparser = require('body-parser');
const router = require('express').Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('./validation');


// middleware
router.use(bodyparser.json())
router.use(bodyparser.urlencoded({extended:true}))


//database connection
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



router.post('/register', async (req, res)=>{
//validate user

const { error } = registerValidation(req.body);
if(error && error.details){
    return res.status(400).json(error.details[0].message);
}else{
    //email validation 
    let sql = 'SELECT * FROM users WHERE email = ?';
    dbconnect.query(sql, [req.body.email], (err, rows, fields)=>{
        if(err){
            // console.err(err.message);
        }else{
            return res.status(400).json({
                message: 'email already exist'
            });
        }
    });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    console.log(req.body);
    const users = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword
    };

    

    dbconnect.query('INSERT INTO users SET ?', users, (err, rows, fields)=>{
        try{
            res.status(200).json({
            message: 'user registered successfully'
        })
        }catch(err){
            res.status(400).send(err);
        }
    });
    
}


});



module.exports = router;