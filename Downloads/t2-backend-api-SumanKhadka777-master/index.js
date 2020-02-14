const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const dotenv = require('dotenv').config();
const auth = require('./auth');
const reportRouter = require('./routes/reportcrime');
const cors = require('cors');




const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    app.use('*', cors({

        origin: 'http://127.0.0.1:5500',
        credentials:true
    
    }));

    
    app.use('/users', userRouter);
    app.use('/missing',require("./routes/missingperson"));
     app.use(auth.verifyUser);
    app.use('/report', reportRouter);
  
    app.use('/missingphoto',uploadRouter);
   
    app.listen(process.env.PORT, () => {
        console.log(`App is running at localhost:${process.env.PORT}`);
    });   
