const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./dbconnect.js')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var orders = require('./routes/userorders.js');
app.use('/orders', orders);



app.listen(5000, () => {
    console.log("up and running -- This is our orders service");
});

module.exports=app;