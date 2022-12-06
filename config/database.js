const mongoose = require("mongoose");

require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;



function connectToDB (){
    mongoose.connect(MONGODB_URL);

    mongoose.connection.on("connected", ()=>{
        console.log("Connected Successfully to database");
    });

    mongoose.connection.on("error", (error)=>{
        console.log(`An Error ${error} occur while connecting to database`);
    })
}

module.exports = {connectToDB};