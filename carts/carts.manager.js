import Cart from './carts.model.js';

class CartManager {
    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            return newCart._id;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate('products.productId').exec();
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid);
            if (cart) {
                const existentItem = cart.products.find(item => item.productId._id.toString() === pid);
                if (existentItem) {
                    existentItem.quantity++;
                } else {
                    cart.products.push({ productId: pid, quantity: 1 });
                }
                await cart.save();
                return cart;
            } else {
                throw { message: 'Cart with id ' + cid + ' not found' };
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await this.getCartById(cid);
            if (cart) {
                cart.products = cart.products.filter(item => item.productId._id.toString() !== pid);
                await cart.save();
                return cart;
            } else {
                throw { message: 'Cart with id ' + cid + ' not found' };
            }
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw error;
        }
    }

    async updateCart(cid, products) {
        try {
            const cart = await this.getCartById(cid);
            if (cart) {
                cart.products = products.map(({ productId, quantity }) => ({ productId, quantity }));
                await cart.save();
                return cart;
            } else {
                throw { message: 'Cart with id ' + cid + ' not found' };
            }
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await this.getCartById(cid);
            if (cart) {
                const product = cart.products.find(item => item.productId._id.toString() === pid);
                if (product) {
                    product.quantity = quantity;
                    await cart.save();
                    return cart;
                } else {
                    throw { message: 'Product with id ' + pid + ' not found in cart' };
                }
            } else {
                throw { message: 'Cart with id ' + cid + ' not found' };
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
            throw error;
        }
    }

    async deleteAllProductsFromCart(cid) {
        try {
            const cart = await this.getCartById(cid);
            if (cart) {
                cart.products = [];
                await cart.save();
                return cart;
            } else {
                throw { message: 'Cart with id ' + cid + ' not found' };
            }
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
            throw error;
        }
    }
}

const cartsManager = new CartManager();

export default cartsManager;
