const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const connectDB = require('./Config/app')

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

app.use(cors());

app.use(
  express.urlencoded({
    extended:false
  })
);
app.use(express.json());

app.get('/',(req,res)=>{
  const response = {
    error:false,
    msg:'Welcome to Renting System!',
  };
  res.send(response);
})

app.use('/products',require('./routes/Product'));
app.use('/borrower',require('./routes/Borrower'));
app.use('/lender',require('./routes/Lender'));
app.use('/order',require('./routes/order'));
const PORT = 3000;

app.listen(
  PORT,"192.168.210.30", console.log('Server is running at port '+PORT)
);
