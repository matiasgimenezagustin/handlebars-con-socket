import ProductDAO from '../dao/productDAO.js';

class ProductRepository {
    async addProduct(productData) {
        return await ProductDAO.create(productData);
    }

    async getProducts({ limit = 10, page = 1, sort, query }) {
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

        const products = await ProductDAO.find(filter, options, sortOptions);
        const total = await ProductDAO.countDocuments(filter);
        const totalPages = Math.ceil(total / options.limit);

        return {
            products,
            total,
            totalPages,
            currentPage: Number(page),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
        };
    }

    async getProductById(pid) {
        return await ProductDAO.findById(pid);
    }

    async updateProductById(pid, updateData) {
        const updatedProduct = await ProductDAO.findByIdAndUpdate(pid, updateData);
        if (!updatedProduct) {
            throw { message: `Product with id ${pid} not found` };
        }
        return updatedProduct;
    }

    async deleteProductById(pid) {
        const deletedProduct = await ProductDAO.findByIdAndDelete(pid);
        if (!deletedProduct) {
            throw { message: `Product with id ${pid} not found` };
        }
    }
}

export default new ProductRepository();
