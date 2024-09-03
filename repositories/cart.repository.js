import CartDAO from '../dao/CartDAO.js';

class CartRepository {
    async createCart(cartData) {
        return await CartDAO.create(cartData);
    }

    async getCartById(cid) {
        return await CartDAO.findById(cid);
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            return await CartDAO.addProductToCart(cid, pid, quantity);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    }

    async deleteProductFromCart(cid, pid) {
        return await CartDAO.deleteProductFromCart(cid, pid);
    }

    async updateCart(cid, products) {
        return await CartDAO.updateById(cid, { products });
    }

    async updateProductQuantity(cid, pid, quantity) {
        return await CartDAO.updateProductQuantity(cid, pid, quantity);
    }

    async deleteAllProductsFromCart(cid) {
        return await CartDAO.clearCart(cid);
    }
}

export default new CartRepository();
