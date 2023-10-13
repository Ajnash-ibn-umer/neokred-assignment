import { Response } from "express";
import { CustomError } from "../config/variables";

export default (res: Response, error: any) => {

    let code, msg: string;
    if (error instanceof CustomError) {
        code = 400
    } else if (error instanceof Error) {
        code = 500
    }
    if (error.errors) {
        
        let validationError :any= Object.values(error.errors)
        console.log("valid",validationError[0]);

        msg = validationError[0]?.message as string 
    } else {
        msg = error.message ?? error
    }
    res.status(code || 500).json({ msg, success: false })

}