import { Request, Response } from 'express'
import { User, UserModel } from '../models/users';
import jwt from "jsonwebtoken";

const userModel = new UserModel()

export default class UserController {

    async index (req: Request, res: Response) : Promise<void> {
        const users = await userModel.index()
        res.json(users)
    }

    async show (req : Request, res: Response): Promise<void> {

        const user = await userModel.show(req.params.id).catch((err) => {

            res.status(400)
            res.json(err)
        })
        if(user) {

            res.json(user)
        } else {
            
            res.status(400)
            res.json("User not found")
        }
    }

    async create (req: Request, res: Response): Promise<void>  {
        try {
            const user: User = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            }

            var tokenSecret = process.env.TOKEN_SECRET as string;
            const newuser = await userModel.create(user)
            const token = jwt.sign({user : newuser}, tokenSecret);
            
            res.json(token)
        } catch(err) {
            res.status(400)
            res.json(err)
        }
    }
    
    async authenticate (req: Request, res: Response) : Promise<void> {
        const user = await userModel.authenticate(req.body.first_name, req.body.password);
        if(user) {
            var tokenSecret = process.env.TOKEN_SECRET as string;
            const token = jwt.sign({user : user}, tokenSecret);
            res.json( token)
        } else {
            res.status(400).json("first_name or password is wrong");
        }
    }
}

