import { SALTROUND } from "../config/variables";

import bcrypt from 'bcrypt'


//local modules

export default {

    bcryptData: (password:string) => {
        return new Promise(async (resolve, reject) => {
           
            try {
                const hash = await bcrypt.hash(password, parseInt(SALTROUND))
           

                resolve({hash,saltRound:SALTROUND})

            } catch (error) {
                reject()
            }

        })


    },

    bcryptCompare: (password:string, hash:string) => {
        return new Promise((resolve, reject) => {
            console.log({SALTROUND,password,hash});
            
            bcrypt.compare(password, hash, function (err:any, result:any) {
                console.log('password:', password + '\n hashcode:', hash);

                if (err) {
                    console.log('p error', err);

                    reject(err.message)
                } else {
                    console.log('reuslt:', result);
                    result ? resolve(result ) :reject('Password is incorrect')
                }


            });
        })


    }


}