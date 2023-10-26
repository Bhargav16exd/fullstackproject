const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const authrouter = require('./routes/route');
const connect_DB = require("./config/db");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use(cookieParser());

connect_DB();


app.use('/api/auth', authrouter);

app.use('/', (req,res)=>{
    res.status(200).json({
        data:"AUTH "
    })
})

module.exports = app;