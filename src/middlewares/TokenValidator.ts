import { json } from 'body-parser';
import {Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { UserModel } from '../models/users';

const TokenValidator = async (req: Request,res: Response, next: () => void ): Promise<void> => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1]
        if(token == undefined) {
            res.status(401)
            res.json('Token is required')
        
        }
        
        const secretToken = process.env.TOKEN_SECRET as string;
        const payload  = jwt.verify(token, secretToken) as JwtPayload;
        
        if (payload) {
            const userModel = new UserModel();
            const user = await userModel.find(payload.user.password).catch((err) => {
                res.status(401)
                res.json('Access denied, invalid token')
            })
            
            if(user) {
                res.locals.user = user;
                next();
            } else {
                res.status(401)
                res.json('Access denied, invalid token')
            }
        }

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
};

export default TokenValidator;
