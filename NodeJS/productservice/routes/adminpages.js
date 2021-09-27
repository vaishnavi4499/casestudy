 const express = require('express');
 var router = express.Router();
 const {Product}=require('../models/productdb');
 var ObjectId=require('mongoose').Types.ObjectId;

 
//localhost:3000/admin
router.get('/', (req, res)=> {
   Product.find((err,doc)=>{
       if(!err){res.send(doc);}
       else { console.log('Error in Retriving products :' + JSON.stringify(err, undefined, 2)); }
   }) ;
});
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send("no record with given id : ${req.params.id}");
     Product.findById(req.params.id,(err,doc)=>{
         if(!err){res.send(doc);}
         else { console.log('Error in Retriving products :' + JSON.stringify(err, undefined, 2)); }
     })

})
router.post('/',(req,res)=>{

    var product = new Product({
          ProductName:req.body.ProductName,
          ProductPrice:req.body.ProductPrice,
          Category:req.body.Category,
          Productdescription:req.body.Productdescription,
          ProductImage:req.body.ProductImage
      });
    product.save((err,doc)=>{
        if (!err) { res.status(201).send(doc); }
        else { console.log('Error in product Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put("/:id",(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("no record with given id : ${req.params.id}");
    var product = {
        ProductName: req.body.ProductName,
        ProductPrice: req.body.ProductPrice,
        Category: req.body.Category,
        Productdescription: req.body.Productdescription,
        ProductImage:req.body.ProductImage
    };
    Product.findByIdAndUpdate(req.params.id,{$set:product},{new:true},(err,doc)=>{   //new:true means doc will return updated value 
        if (!err) { res.send(doc); }
        else { console.log('Error in product Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record with given id : ${req.params.id}");
    Product.findByIdAndRemove(req.params.id,(err,doc)=>{
    if (!err) { res.send(doc); }
    else { console.log('Error in product deletion :' + JSON.stringify(err, undefined, 2)); }
    })

})



 module.exports = router;