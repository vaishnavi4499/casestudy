const express =require ('express')
const app =express()
const routes=require('./routes/app');
var cors = require('cors');

const port =3500;

app.use(express.json())
app.use('/api',routes);


const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));



app.listen(port,()=>{
    console.log('Gateway is running on port '+ port);
})

