import {Request, Response} from 'express';

const createUserValidator = (req: Request,res: Response, next: () => void ): void => {
    try {
        let errors = [];
    
        const first_name: string = req.body.first_name as string;
        if (first_name == undefined) {
            errors.push("first_name field is required");
        }
        const last_name: string = req.body.last_name as string;
        if (last_name == undefined) {
            errors.push("last_name field is required");
        }
        const password: string = req.body.password as string;
        if (password == undefined) {
            errors.push("password field is required");
        }
        if (password.length < 8) {
            errors.push("password should be at least 8 characters and numbers");
        }
        if(errors.length > 0) {
            res.status(400).json( errors);
            return;
        }
        next();
    } catch (error) {
        res.status(400)
        res.json('Bad Request')
        return
    }
};

export default createUserValidator;
