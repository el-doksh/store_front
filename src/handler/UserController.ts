import { Request, Response } from 'express'
import { User, UserModel } from '../models/users';

const userModel = new UserModel()

export default class UserController {

    async index (req: Request, res: Response) : Promise<void> {
        const users = await userModel.index()
        res.json(users)
    }

    async show (req : Request, res: Response) {

        const user = await userModel.show(req.params.id).catch((err) => {

            res.status(400)
            res.json(err)
        })
        res.json(user)
    }

    async create (req: Request, res: Response)  {
        try {
            const user: User = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            }

            const newuser = await userModel.create(user)
            
            res.json(newuser)
        } catch(err) {
            res.status(400)
            res.json(err)
        }
    }

    async destroy (req: Request, res: Response) {
        const deleted = await userModel.delete(req.body.id)
        res.json(deleted)
    }
}

