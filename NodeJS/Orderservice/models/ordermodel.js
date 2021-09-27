const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    name: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    order_time: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'Pending'
    }

});
module.exports = { Order };
