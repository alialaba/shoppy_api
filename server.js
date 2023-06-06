const app = require("./app")

//connect to database
const database = require("./config/database");
database.connectToDB();

require("dotenv").config();
const PORT = process.env.PORT || 5000;




app.listen(PORT, ()=>{
    console.log(`Listen to server at ${PORT}`)
})





