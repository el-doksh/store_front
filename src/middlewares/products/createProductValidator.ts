import {Request, Response} from 'express';

const createProductValidator = (req: Request,res: Response, next: () => void ): void => {
    let errors = [];

    const name: string = req.body.name as string;
    if (name == undefined) {
        errors.push("name field is required");
    }
    const price: number = req.body.price as number;
    if (price == undefined) {
        errors.push("price field is required");
    }
    if (isNaN(price)){
        errors.push("price should be a number");
    }
    const category: string = req.body.category as string;
    if (category == undefined) {
        errors.push("category field is required");
    }
    if(errors.length > 0) {
        
        res.status(400).json( errors);
        return;
    }
    next();
};

export default createProductValidator;
