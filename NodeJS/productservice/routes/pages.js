const express=require('express');
var router=express.Router();
const { Product } = require('../models/productdb');

router.get('/user', (req, res) => {
    Product.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.status(404) }
    });
})


module.exports=router;