import cartsManager from "./carts.manager.js";

export const postCart = async (req, res) => {
    try {
        const cartId = await cartsManager.createCart();
        res.status(201).json({ ok: true, message: 'Cart created', payload: cartId });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(cid);
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
        const cart = await cartsManager.getCartById(cid);
        if (cart) {
            res.status(200).render('cart',{ ok: true, payload: cart });
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
        const cart = await cartsManager.addProductToCart(cid, pid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsManager.deleteProductFromCart(cid, pid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const updatedCart = await cartsManager.updateCart(cid, products);
        res.status(200).json({ ok: true, payload: updatedCart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartsManager.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ ok: true, payload: updatedCart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.deleteAllProductsFromCart(cid);
        res.status(200).json({ ok: true, payload: cart });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
