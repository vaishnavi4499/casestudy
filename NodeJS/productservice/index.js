const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const {mongoose}=require('./db.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));



// productservice routes
var adminpage=require('./routes/adminpages.js');
var userpage=require('./routes/pages.js');
app.get('/user', userpage);
app.use('/admin',adminpage );



//start the server
app.listen(3000, () => {
    console.log("up and running -- This is our products service");
});

module.exports=app;