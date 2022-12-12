const express = require("express");
const app = express()
const authRoute = require("./routes/auth")
const errorHandler = require("./middleware/error");

app.use(express.json())// express body parser




//all routes
app.use("/api/auth", authRoute)

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


// Error handler (should be last piece of middleware);
app.use(errorHandler)


module.exports = app