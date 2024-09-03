import express from 'express';
import { 
    addProductToCart,
    deleteAllProductsFromCart, 
    deleteProductFromCart, 
    getCartById, 
    postCart, 
    postProductToCart, 
    purchaseCart, 
    updateCart, 
    updateProductQuantity 
} from '../controllers/carts.controller.js';
import handlePolicies from '../middlewares/handlePolicies.middleware.js'; 

const cartRouter = express.Router();

cartRouter.post('/', handlePolicies(['ADMIN']), postCart); 
cartRouter.get('/:cid', handlePolicies(['USER', 'ADMIN']), getCartById); 
cartRouter.post('/:cid/product/:pid', handlePolicies(['USER']), postProductToCart); 
cartRouter.delete('/:cid/products/:pid', handlePolicies(['USER', 'ADMIN']), deleteProductFromCart);
cartRouter.put('/:cid', handlePolicies(['USER', 'ADMIN']), updateCart); 
cartRouter.put('/:cid/products/:pid', handlePolicies(['USER']), updateProductQuantity); 
cartRouter.delete('/:cid', handlePolicies(['USER', 'ADMIN']), deleteAllProductsFromCart); 
cartRouter.post('/:cid/purchase', handlePolicies(['USER']), purchaseCart);
cartRouter.post('/:cid/products/:pid', handlePolicies(['USER']), addProductToCart);

/* export const cartTemplateRouter = express.Router(); */
/* cartTemplateRouter.get('/:cid', getCartByIdTemplate); */

export default cartRouter;
