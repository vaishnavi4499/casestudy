const mongoose=require('mongoose')

const Schema=mongoose.Schema;
var bcrypt = require('bcrypt');

const customerSchema=new Schema({
    username:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
//method for hashing password
// customerSchema.statics.hashPassword = function hashPassword(password) {
//     return bcrypt.hashSync(password, 10);
// }
//method for checking whether login credentials are present in db
// customerSchema.methods.isValid = function (hashPassword) {
//     return bcrypt.compareSync(hashPassword, this.password);
// }
module.exports = mongoose.model('customermodel',customerSchema);


