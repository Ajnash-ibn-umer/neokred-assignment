import { Request, Response, Router } from "express";

//local modules
import { CustomError } from "../config/variables";
import errorHandler from "../utils/errorHandler";
import userSchema from "../models/user"
import bcryptUtil from "../utils/bcrypt"
import { JWTsigning } from "../utils/jwtAuth";

const router = Router()
router.post("/register", async (req: Request, res: Response) => {
    try {
        const data = req.body
        console.log({ data });

        /// email  existance
        const userExist = await userSchema.exists({ emailAddress: data.emailAddress });


        // validations
        
        let checkPassword=RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$").test(data.password)
       if(!checkPassword)throw new CustomError("Password must contain minimum length of 8 characters, at least one uppercase letter and one digit")
       
        if (userExist) throw new CustomError("This account already exists");
        if (data.password !== data.confirmPassword) throw new CustomError("Passwords do not match");
        if (!isNaN(Date.parse(data.dateOfBirth)) === false) throw new CustomError("Invalid Date")

        //password hashing
        const { hash, saltRound }: any = await bcryptUtil.bcryptData(data.password);
        data.password = hash;
        data.saltRound = saltRound
        delete data["confirmPassword"];

        const newUser = await new userSchema(data).save()
        console.log({ newUser });

        res.status(200).json({
            success: true,
            msg: "Your registration is completed"
        })

    } catch (error: any) {

            errorHandler(res, error)
    }
})

router.post("/login",async(req:Request,res:Response)=>{
    try {
        const data=req.body
        console.log({data});
        
        const userExist = await userSchema
        .findOne({ emailAddress: data.emailAddress }).select("emailAddress saltRound password fullName")
        .lean()
        
        
      //check existance of user
      if (!userExist) throw "This Account is not exist";

      // check password
      let checkPassword = await bcryptUtil.bcryptCompare(
        data.password,
        userExist.password
      );
      
      if (!checkPassword) throw new CustomError("Password is incorrect");
      const token = await JWTsigning({
        email: userExist.emailAddress,
        uid:userExist._id,
        name:userExist.fullName
      },"5m");


        res.status(200).json({
            success: true,
            msg: "You  successfully authenticated",
            token
        })
    } catch (error:any) {
        console.log({error});
        
        errorHandler(res, error)
    }
})
export default router