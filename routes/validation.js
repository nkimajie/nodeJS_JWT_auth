const Joi = require('@hapi/joi');
const mysql = require('mysql');

const dbconnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

const registerValidation = data =>{
            //form validation
const schema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .required(),
    lastname: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .min(3)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required(),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password')),
});
    return schema.validate(data);
};

// const emailValidation = data =>{
//    // check if email exist
//    const emailExist = dbconnect.query('SELECT * FROM users WHERE email = ?', [data], (err, rows, fields)=>{
//     if(rows){
//         return res.status(400, data);
//     };

// });
// }


const loginValidation = data =>{
            //form validation
const schema = Joi.object({
    email: Joi.string()
        .min(3)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required()
});
    return Joi.validate(data, schema);
};


module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
