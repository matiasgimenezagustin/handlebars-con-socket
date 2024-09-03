import Product from '../models/product.model.js';

class ProductDAO {
    async create(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    async find(filter, options, sortOptions) {
        return await Product.find(filter)
            .sort(sortOptions)
            .limit(options.limit)
            .skip(options.skip)
            .exec();
    }

    async countDocuments(filter) {
        return await Product.countDocuments(filter);
    }

    async findById(id) {
        return await Product.findById(id).exec();
    }

    async findByIdAndUpdate(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async findByIdAndDelete(id) {
        return await Product.findByIdAndDelete(id).exec();
    }
}

export default new ProductDAO();
