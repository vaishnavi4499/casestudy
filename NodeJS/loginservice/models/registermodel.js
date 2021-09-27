var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');

var schema=new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});
//method for hashing password
schema.statics.hashPassword=function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

//method for checking whether login credentials are present in db
schema.methods.isValid=function(hashPassword){
    return bcrypt.compareSync(hashPassword,this.password);
}
module.exports=mongoose.model('registermodel',schema);