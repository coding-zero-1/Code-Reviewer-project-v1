require("dotenv").config()
const app = require("./src/app")

app.listen(3000,()=>{
    console.log("Server has started on port 3000")
})