const express = require("express")
const app = express()
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")
const userRouter = require("./routes/user")
const rateLimiter = require("express-rate-limit")
const limiter = rateLimiter({
    max:5,
    windowMs:60*1000,
    message:'too many requests, please wait for a minute',
    standardHeaders:true,
    legacyHeaders:false
});

app.use(limiter);
app.use(express.json())
app.use(cors())

app.use('/user',userRouter)
app.use("/ai",aiRoutes)

module.exports = app;