const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const config=require("./../config/config.json");
require('dotenv').config();
const {verifyToken} = require('./verifyToken')

var mongoose = require('mongoose');


server.use(bodyParser.json());
const cors = require('cors');


server.use(cors());


const userRouter = require('./../router/user');

const authRouter = require('./../router/authController');

 
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:1234@hoffen.ydqkw.mongodb.net/?retryWrites=true&w=majority&appName=hoffen`;

 
console.log('connected to the database',db);

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    },function(error){
        if(error)
        {
        console.log(error);
  }
        else
        {
        console.log('connected to the database',db);
        }
	});

  

server.use("/user",verifyToken, userRouter);
// server.use("/user", userRouter);
server.use("/auth", authRouter);

module.exports= server;