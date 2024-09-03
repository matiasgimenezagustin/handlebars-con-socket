import express from 'express';
import { 
    addProduct, 
    deleteProductById, 
    getProductById, 
    getProducts, 
    updateProductById 
} from '../controllers/products.controller.js';
import handlePolicies from '../middlewares/handlePolicies.middleware.js';

const productsRouter = express.Router();

productsRouter.get('/', handlePolicies(['PUBLIC']), getProducts); 
productsRouter.post('/', handlePolicies(['ADMIN']), addProduct); 
productsRouter.get('/:pid', handlePolicies(['PUBLIC']), getProductById); 
productsRouter.put('/:pid', handlePolicies(['ADMIN']), updateProductById); 
productsRouter.delete('/:pid', handlePolicies(['ADMIN']), deleteProductById); 

const productsPageRouter = express.Router();

/* productsPageRouter.get('/', getProductsTemplateController)
productsPageRouter.get('/:pid', getProductByIdTemplateController) */

export { productsRouter, productsPageRouter };
