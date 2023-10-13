import { NextFunction, Request, Response } from "express";
import { RequestExpress } from "../types";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/variables";
export default (req: RequestExpress, res: any, next: NextFunction) => {

    try {
        jwt.verify(req.headers["authorization"] ?? "", JWT_SECRET, async (err, value: any) => {
            if (err) {
               
                res.status(401).json({
                    success: false,
                    msg: "Authorization failed ,may be token is expired"
                })
            } else {
                console.log("varified", value)
                req.uid = value.data?.uid
                req.email = value.data.email
                next()

            }
        });
    } catch (error: any) {
        console.log("in error block",error);
        
        res.status(401).json({
            success: false,
            msg: error.message ?? error
        })


    }

}