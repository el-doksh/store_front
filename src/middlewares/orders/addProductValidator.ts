import {Request, Response} from 'express';
import { OrderModel } from '../../models/orders';
import { ProductModel } from '../../models/products';


const orderModel = new OrderModel();
const productModel = new ProductModel();

const addProductValidator = async (req: Request,res: Response, next: () => void ): Promise<void> => {
    let errors = Array();

    const quantity: number = req.body.quantity as number;
    if (quantity == undefined) {
        errors.push("quantity field is required");
    }
    if(quantity <= 0) {
        errors.push("quantity should be greater than 0");
    }

    const order_id: number = req.body.order_id as number;
    if (order_id == undefined) {
        errors.push("order_id field is required");
    }
    
    const findOrder = await orderModel.show( order_id, parseInt(res.locals.user.id)).catch((err) => {
        errors.push("Order not found");
    })
    if(!findOrder) {
        errors.push("Order not found");
    }

    
    const product_id: number = req.body.product_id as number;
    if (product_id == undefined) {
        errors.push("product_id field is required");
    }
    const findProduct = await productModel.show( product_id).catch((err) => {
        errors.push("product not found");
    })
    if(!findProduct) {
        errors.push("product not found");
    }
    if(errors.length > 0) {
        
        res.status(400).json(errors);
        return;
    }
    next();
};

export default addProductValidator;
