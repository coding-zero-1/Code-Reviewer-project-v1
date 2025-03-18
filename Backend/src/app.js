const express = require("express")
const app = express()
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")
const userRouter = require("./routes/user")

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({
        msg:"Hello there"
    })
})

app.use('/user',userRouter)
app.use("/ai",aiRoutes)

module.exports = app;