const mongoose = require('mongoose');

var Product=mongoose.model('Product',{
    ProductName: {
        type: String, 
        require: true
    },
    ProductPrice: {
        type: Number,
        require: true
    },
     Category: {
        type: String,
        require: true
    },
    Productdescription: {
        type: String,
        require: true
    },
    ProductImage:{
        type:String,
        require:true
    }
});
module.exports={Product};
