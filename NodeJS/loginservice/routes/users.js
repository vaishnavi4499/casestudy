var express= require('express');
var router=express.Router();
var User=require('../models/registermodel');
var passport=require('passport');
var nodemailer = require("nodemailer");
 
 
 /**adding details to register db*/
router.post('/register',function(req,res,next){
addToDB(req,res);
})

async function addToDB(req,res){
    var user=new User({
        username: req.body.username,
        email:req.body.email,
        password:User.hashPassword(req.body.password),
        creation_dt:Date.now()
    });
    User.find({email:req.body.email})
    .then(resp=>{
        if(resp.length!=0){
            return res.json({
                data:[],
                success:false,
                msg:"Email Exists"
            })
        }
        else{
            user.save((err, doc) => {
                return res.json({
                    data: [],
                    success: true,
                    msg: "resgistered successfully"
                })
                
            })

        }
    })
    .catch(err=>{
        return res.json({
            data: [],
            success: false,
            msg: "error"
        })
        
        
    })

}
/**login route */
router.post('/login',function(req,res,next){
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({message:'Login success'});
        });
        sendMail(User,info=>{
            console.log('the email is sent ${info.messageId}');
            res.send(info);
        })
    })(req, res, next);

})
async function sendMail(user,callback){
   // create reusable transporter object using the default SMTP transport
   let transporter=nodemailer.createTransport({
       service:'gmail',
       secure:false,
       auth:{
           user:'kuchivaishnavi1999@gmail.com',
           pass:'vyshu123456789'
       }
   });
   var mailOptions={
       from: '"Peach_store@gmail.com"',//sender address
       to:"kuchivaishnavi1999@gmail.com",//list of receivers
       subject:"welcome to the peach store", //subject line
       text:`Hi you logged in as admin please logout if you are not admin
            Contact at: +91 445566778` 
   };
   //send mail with defined transport object
   let info =await transporter.sendMail(mailOptions);
   console.log(info);
}

module.exports=router;



// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             if (!user.validPassword(password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         });
//     }
// ));