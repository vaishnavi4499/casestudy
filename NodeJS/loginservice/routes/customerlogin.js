var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var Customer=require('../models/customermodel');

/**verifying jwt token */

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('unauthorized request')
    }
    let payload =jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.email=payload.subject
    next()
}


// GET METHOD USE :http://localhost:4000/customer
router.get('/',(req,res)=>{
    res.send("hello");
})

//POST METHOD USE :http://localhost:4000/customer/customerregister
router.post("/customerregister", async (req, res) => {
    const body = req.body;

    if (!(body.username && body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    let payload ={subject:Customer._id}
    let token=jwt.sign(payload,'secretkey')
    // creating a new mongoose doc from user data
    const customer = new Customer(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    customer.password = await bcrypt.hash(customer.password, salt);
    customer.save().then((doc) => res.status(201).send({token}));
});




//POST METHOD USE :http://localhost:4000/customer/customerlogin
router.post("/customerlogin", async (req, res) => {
    const body = req.body;
    const customer = await Customer.findOne({ email: body.email });
    if (customer) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, customer.password);
        if (validPassword) {
            let payload={subject:Customer._id}
            let token =jwt.sign(payload,'secretkey')
            res.status(200).send({token});
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "customer does not exist" });
    }
});






module.exports = router;   //if not written  error:TypeError: Router.use() requires a middleware function but got a Object is thrown