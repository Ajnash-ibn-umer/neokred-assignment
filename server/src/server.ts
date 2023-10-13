// modules
import express from "express"
import mongoose, { connect } from "mongoose"
import bodyParser from "body-parser";
import cors from "cors"
//local modules
import { DB, PORT } from "./config/variables"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"

//configuration
const app =express()
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

//middlewares
app.use("/",authRouter)
app.use("/user",userRouter)

// handle  error globally
process.on('uncaughtException', (err) => {
    console.log('uncaughtException error is occurred ', err)
    process.exit()
})
process.on('unhandledrejection', (err) => {
    console.log('unhandledrejection error is occurred ', err)

})
// connect to db
mongoose.set('strictQuery', true)
mongoose.pluralize(null)
connect(DB)
    .catch((err) => {
        console.log("Not connected to db")
        console.log(err)
    })
//connect server
app.listen(PORT || 8001,(()=>{
console.log(`Server running on port ${PORT || 8001}`)
}))