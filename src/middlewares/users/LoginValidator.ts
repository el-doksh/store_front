import {Request, Response} from 'express';

const LoginValidator = (req: Request,res: Response, next: () => void ): void => {
    try {
        let errors = [];
    
        const first_name: string = req.body.first_name as string;
        if (first_name == undefined) {
            errors.push("first_name field is required");
        }
        const password: string = req.body.password as string;
        if (password == undefined) {
            errors.push("password field is required");
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

export default LoginValidator;
