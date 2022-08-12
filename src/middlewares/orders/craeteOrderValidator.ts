import {Request, Response} from 'express';

const craeteOrderValidator = (req: Request,res: Response, next: () => void ): void => {
    try {
        let errors = [];

        const status: string = req.body.status as string;
        if (status == undefined) {
            errors.push("status field is required and its value are active/completed");
        }
        if(errors.length > 0) {
            
            res.status(400).json(errors);
            return;
        }
        next();
    } catch (error) {
        res.status(400)
        res.json('Bad Request')
        return
    }
};

export default craeteOrderValidator;
