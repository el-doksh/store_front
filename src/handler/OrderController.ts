import { Request, Response } from 'express'
import { Order, OrderModel , addProduct } from '../models/orders';

const orderModel = new OrderModel()

export default class OrderController {

    async index (req: Request, res: Response) : Promise<void> {
        const orders = await orderModel.index(parseInt(res.locals.user.id))
        res.json(orders)
    }

    async completed (req: Request, res: Response) : Promise<void> {
        const orders = await orderModel.completed(parseInt(res.locals.user.id))
        res.json(orders)
    }

    async show (req : Request, res: Response) : Promise<void>{

        const order = await orderModel.show(parseInt(req.params.id), parseInt(res.locals.user.id)).catch((err) => {

            res.status(400)
            res.json(err)
        })
        if (order) {
            res.json(order)
        } else {
            res.status(400).json("Order not found")
        }
    }

    async create (req: Request, res: Response) : Promise<void> {
        try {
            const order: Order = {
                user_id : res.locals.user.id,
                status : req.body.status
            }

            const neworder = await orderModel.create(order).catch((err) => {
                res.status(400)
                res.json("Error while creating order");
                return;
            })
            res.json(neworder);
        } catch(err) {
            res.status(400)
            res.json(err)
        }
    }

    
    async addProduct (req: Request, res: Response) : Promise<void> {
        try {
            const newOrderProduct = await orderModel.addProduct( parseInt(req.body.quantity), parseInt(req.body.order_id), parseInt(req.body.product_id)).catch((err) => {
                res.status(400)
                res.json("Error while creating order");
                return;
            })
            if(newOrderProduct) {

                res.json(newOrderProduct);
            } else {
                res.status(400)
                res.json("Error while creating order");
                return;
            }
        } catch(err) {
            res.status(400)
            res.json(err)
        }
    }
    
   
}

