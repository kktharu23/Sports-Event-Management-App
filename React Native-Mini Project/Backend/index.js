var dotenv =require('dotenv').config();
var express=require('express');
var app =express();
const bodyparser=require("body-parser")
var data =require('./config/database')
data;
const cors = require('cors');
app.use(cors());

var userrouter=require('./router/sportsrouter');
var playerrouter=require('./router/playerrouter');

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

app.use('/',userrouter);
app.use('/',playerrouter);

app.listen(process.env.PORT,function(){
    console.log (`server is running on the port ${process.env.PORT}`)
})