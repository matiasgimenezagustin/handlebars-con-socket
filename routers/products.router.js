import express from 'express'
import { 
    deleteProductController, 
    getProductByIdController, 
    getProductByIdTemplateController, 
    getProductsController, 
    getProductsTemplateController, 
    postProductController, 
    putProductController 
} from '../controllers/products.controller.js'

const productsRouter = express.Router()


productsRouter.get('/', getProductsController)
productsRouter.post('/', postProductController)
productsRouter.get('/:pid', getProductByIdController)
productsRouter.put('/:pid', putProductController)
productsRouter.delete('/:pid', deleteProductController)

const productsPageRouter = express.Router()

productsPageRouter.get('/', getProductsTemplateController)
productsPageRouter.get('/:pid', getProductByIdTemplateController)

export {productsRouter, productsPageRouter}