const express = require("express");
const app = express()

app.use(express.json())// express body parser





//all routes


//home route 
app.get("/", (req,res)=>{
    return res.json({
        status: true,
        message:"Hello world"
    })
})


// ERROR 404 PAGE 
app.use("*", (req,res)=>{
return res.status(404).json({message: "Page not found"})
})

module.exports = app