import Cart from '../models/carts.model.js';

class CartDAO {
    async create(cartData) {
        const newCart = new Cart(cartData);
        return await newCart.save();
    }

    async findById(id) {
        return await Cart.findById(id).populate('products.productId').exec();
    }

    async updateById(id, updateData) {
        return await Cart.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async deleteById(id) {
        return await Cart.findByIdAndDelete(id).exec();
    }

  
    async addProductToCart(cid, pid, quantity = 1) {
        const cart = await this.findById(cid);
        
        if (!cart) {
            throw new Error('Cart not found');
        }
    
        const productIndex = cart.products.findIndex(p => p.productId._id.toString() === pid);
    
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId: pid, quantity });
        }
    
        await cart.save();
    
        return cart.populate('products.productId'); 
    }
    

    async deleteProductFromCart(cid, pid) {
        const cart = await this.findById(cid);

        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== pid);
        return await cart.save();
    }

    async clearCart(cid) {
        return await this.updateById(cid, { products: [] });
    }
}

export default new CartDAO();
