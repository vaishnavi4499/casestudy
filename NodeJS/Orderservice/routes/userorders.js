
const express = require('express');
const { mongoose } = require('mongoose');
const { Order } = require('../models/ordermodel');
var ObjectId = require('mongoose').Types.ObjectId;
var router = express.Router();


//localhost:5000/orders/
router.get('/', (req, res) => {
    Order.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log("error in retrirving orders :" + JSON.stringyfy(err, undefined, 2)); }
    })
});

/**get order by id */
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('no order with given id: ${req.params.id}');

    Order.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("error in retrirving orders :" + JSON.stringyfy(err, undefined, 2)); }
    });
})

/**post the orders */
router.post('/', (req, res) => {
    var order = new Order({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        email: req.body.email,
    });
    order.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in product Save :' + JSON.stringify(err, undefined, 2)); }
    })
})
  
/**delete the orders */
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record with given id : ${req.params.id}")
    Order.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('error in order deletion :'+ JSON.stringify(err,undefined,2));}
    })

})



module.exports = router;

