const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

//Get Config
dotenv.config({
    path:'./config/config.env'
})

connectDB();

const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/lender',require('./routes/Lender'));

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
