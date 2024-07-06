import Product from './product.model.js';

class ProductsManager {
    async addProduct(product) {
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query }) {
        try {
            const options = {
                limit: Number(limit),
                skip: (Number(page) - 1) * Number(limit),
            };

            let sortOptions = {};
            if (sort) {
                sortOptions = { price: sort === 'asc' ? 1 : -1 };
            }

            let filter = {};
            if (query) {
                filter = { $or: [{ title: new RegExp(query, 'i') }, { category: new RegExp(query, 'i') }] };
            }

            const products = await Product.find(filter)
                .sort(sortOptions)
                .limit(options.limit)
                .skip(options.skip)
                .exec();

            const total = await Product.countDocuments(filter);
            const totalPages = Math.ceil(total / options.limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                products,
                total,
                totalPages,
                currentPage: Number(page),
                hasPrevPage,
                hasNextPage,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null
            };
        } catch (error) {
            throw error;
        }
    }

    async getProductById(pid) {
        try {
            const product = await Product.findById(pid).exec();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProductById(pid, updateProduct) {
        try {
            const productToUpdate = await Product.findByIdAndUpdate(pid, updateProduct, { new: true }).exec();
            if (!productToUpdate) {
                throw { message: `Product with id ${pid} not found` };
            }
            return productToUpdate;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(pid) {
        try {
            const productToDelete = await Product.findByIdAndDelete(pid).exec();
            if (!productToDelete) {
                throw { message: `Product with id ${pid} not found` };
            }
        } catch (error) {
            throw error;
        }
    }
}

export const products_manager = new ProductsManager();
