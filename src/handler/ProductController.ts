import { Request, Response } from 'express'
import { Product, ProductModel } from '../models/products';

const productModel = new ProductModel()

export default class ProductController {

    async index (req: Request, res: Response) : Promise<void> {
        try {
            const products = await productModel.index()
            res.json( products)
        } catch(err) {
            res.status(400).json(err)
        }
    }

    async mostPopular (req: Request, res: Response) : Promise<void> {
        try {
            const products = await productModel.mostPopular()
            res.json( products)
        } catch(err) {
            res.status(400).json(err)
        }
    }
    
    async show (req : Request, res: Response) : Promise<void>{
        try {
            const product = await productModel.show(parseInt(req.params.id)).catch((err) => {
                res.status(400).json(err)
            })
            if (product) {
                res.json(product)
            } else {
                res.status(400).json("Product not found")
            }
        } catch(err) {
            res.status(400).json(err)
        }
    }

    async create (req: Request, res: Response): Promise<void>  {
        try {
            const product: Product = {
                name: req.body.name,
                price: parseFloat(req.body.price),
                category: req.body.category
            }

            const newproduct = await productModel.create(product)
            res.json(newproduct)
        } catch(err) {
            res.status(400).json(err)
        }
    }

    async productsByCategory(req: Request, res: Response) : Promise<void>{
        try {
            const products = await productModel.productsByCategory(req.params.name)
            res.json( products)
        } catch(err) {
            res.status(400).json(err)
        }
    }
    
}

