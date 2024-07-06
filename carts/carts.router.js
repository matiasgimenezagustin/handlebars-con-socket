import express from 'express';
import {
    getCartById,
    postCart,
    postProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    deleteAllProductsFromCart,
    getCartByIdTemplate
} from './carts.controller.js';

const cartRouter = express.Router();

cartRouter.post('/', postCart);
cartRouter.get('/:cid', getCartById);
cartRouter.post('/:cid/product/:pid', postProductToCart);
cartRouter.delete('/:cid/products/:pid', deleteProductFromCart);
cartRouter.put('/:cid', updateCart);
cartRouter.put('/:cid/products/:pid', updateProductQuantity);
cartRouter.delete('/:cid', deleteAllProductsFromCart);


export const cartTemplateRouter = express.Router();
cartTemplateRouter.get('/:cid', getCartByIdTemplate);

export default cartRouter;

