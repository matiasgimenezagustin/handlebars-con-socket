import cartRepository from '../repositories/cart.repository.js';

import productRepository from '../repositories/product.repository.js';
import ticketsRepository from '../repositories/tickets.repository.js';

export const postCart = async (req, res) => {
    try {
        const cartId = await cartRepository.createCart();
        res.status(201).json({ ok: true, message: 'Cart created', payload: cartId });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);
        if (cart) {
            res.status(200).json({ ok: true, payload: cart });
        } else {
            res.status(404).json({ ok: false, message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const getCartByIdTemplate = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);
        if (cart) {
            res.status(200).render('cart', { ok: true, payload: cart });
        } else {
            res.status(404).json({ ok: false, message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const postProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartRepository.addProductToCart(cid, pid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartRepository.deleteProductFromCart(cid, pid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const updatedCart = await cartRepository.updateCart(cid, products);
        res.status(200).json({ ok: true, payload: updatedCart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartRepository.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ ok: true, payload: updatedCart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.deleteAllProductsFromCart(cid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};


export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ ok: false, message: 'Cart not found' });
        }

        let totalAmount = 0;
        const productsNotProcessed = [];

        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.productId);

            if (product.stock >= item.quantity) {
                totalAmount += item.quantity * product.price;
                await productRepository.updateProductById(product._id, { stock: product.stock - item.quantity });
            } else {
                productsNotProcessed.push(product._id);
            }
        }

        await cartRepository.updateCart(cid, productsNotProcessed);

        if (totalAmount > 0) {
            const ticket = await ticketsRepository.createTicket(totalAmount, req.user.email);
            return res.status(201).json({ ok: true, message: 'Purchase completed', ticket });
        } else {
            return res.status(400).json({ ok: false, message: 'No products could be purchased', productsNotProcessed });
        }
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body; 
        const cart = await cartRepository.addProductToCart(cid, pid, quantity);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

