import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { 
                type: Schema.Types.ObjectId, 
                ref: 'Product', required: true 
            },
            quantity: { type: Number, default: 1 },
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;