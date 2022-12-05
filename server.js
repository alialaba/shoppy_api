const app = require("./app")

const PORT = process.env.PORT || 4340;


app.listen(PORT, ()=>{
    console.log(`Listen to server at ${PORT}`)
})





