import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JWT_SECRET } from '../config/variables'
dotenv.config()

 export const JWTsigning = (data:any, time="5m") => {
    return new Promise((resolve, reject) => {
        console.log('key:', JWT_SECRET);

        jwt.sign({
            data: data,
        }, JWT_SECRET, { expiresIn: time || "5m" }, (err, decoded) => {
            if (err) {
                console.error(err);

            } else {
                const token = decoded
                console.log('decoded', decoded);
                resolve(token)
            }
        })

    })

}

