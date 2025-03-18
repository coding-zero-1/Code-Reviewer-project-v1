const {Router} = require("express")
const userRouter = Router()
const UserModel = require("../../db.js")
const jwt = require("jsonwebtoken")
const {z}=require("zod")
const bcrypt = require("bcrypt")
const auth = require("../middlewares/auth.js")
require("dotenv").config()

userRouter.post('/signup',async(req,res)=>{
    const {name , email , password} = req.body

    const requiredBody = z.object({
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(100),
        email:z.string().min(3).max(100).email()
    })

    const bodyMatch = requiredBody.safeParse(req.body)

    if(!bodyMatch.success){
        res.json({
            msg:"invalid body passed"
        })
        return
    }else{

        const hashedPassword = await bcrypt.hash(password,5)
        try {
            await UserModel.create({
                email:email,
                name:name,
                password:hashedPassword
            })

            res.json({
                msg:"you are signed up"
            })
        } catch (error) {
            console.log("error---->",error)
            res.json({
                msg:"you are already signed in, please login"
            })
        }
    }
})

userRouter.post('/signin',async(req,res)=>{
    const {email , password} = req.body
    const user = await UserModel.findOne({email:email})
    const passwordMatch = await bcrypt.compare(password,user.password)

    if(user && passwordMatch){
        const token = await jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.json({
            token:token
        })
        return
    }else{
        res.json({
            msg:"Invalid credentials"
        })
    }
})

userRouter.get('/home',auth,(req,res)=>{
    res.json(
        [
            {
                thing:"mobile",
                price:2000
            },
            {
                thing:"laptop",
                price:3000
            }
        ]
    )
})

module.exports = userRouter;