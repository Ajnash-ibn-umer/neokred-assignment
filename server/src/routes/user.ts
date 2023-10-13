import { Request, Response, Router } from "express";

//local modules
import { CustomError } from "../config/variables";
import errorHandler from "../utils/errorHandler";
import auth from "../middlewares/auth";
import { RequestExpress } from "../types";
import userSchema from "../models/user"


const router = Router()
router.get("/profile", auth,async (req: RequestExpress, res: Response) => {
    try {
    console.log(req.uid);
    
    const user=await userSchema.findOne({_id:req.uid},{password:0,__v:0})
      if(!user) throw new CustomError("User can`t be found")
        res.status(200).json({
            success: true,
            msg: "User information are fetched",
            user
        })

    } catch (error: any) {
            errorHandler(res, error)
    }
})

export default router