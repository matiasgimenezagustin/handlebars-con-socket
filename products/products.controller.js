import { products_manager } from './products.manager.js';

export const getProductsTemplateController = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;

        const options = {
            limit: limit && !isNaN(limit) ? Number(limit) : 10,
            page: page && !isNaN(page) ? Number(page) : 1,
            sort: sort === 'asc' || sort === 'desc' ? sort : null,
            query: query || null
        };

        const result = await products_manager.getProducts(options);

        const { products, totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage } = result;

        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}products`;
        const prevLink = hasPrevPage ? `${baseUrl}?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `${baseUrl}?page=${nextPage}` : null;

        res.status(200).render('home', {
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const getProductsController = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;

        const options = {
            limit: limit && !isNaN(limit) ? Number(limit) : 10,
            page: page && !isNaN(page) ? Number(page) : 1,
            sort: sort === 'asc' || sort === 'desc' ? sort : null,
            query: query || null
        };

        const result = await products_manager.getProducts(options);

        const { products, totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage } = result;

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const prevLink = hasPrevPage ? `${baseUrl}?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `${baseUrl}?page=${nextPage}` : null;

        res.status(200).json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await products_manager.getProductById(pid);
        if (product) {
            res.status(200).json({ ok: true, payload: product });
        } else {
            res.status(404).json({ ok: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const getProductByIdTemplateController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await products_manager.getProductById(pid);
        if (product) {
            res.status(200).render('detail', { ok: true, payload: product });
        } else {
            res.status(404).json({ ok: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const postProductController = async (req, res) => {
    try {

        const createdProduct = await products_manager.addProduct(req.body);
        res.status(201).json({ ok: true, message: 'Product created', payload: createdProduct });
    } catch (error) {
        console.log(error)
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const putProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await products_manager.updateProductById(pid, req.body);
        res.status(200).json({ ok: true, message: 'Product updated', payload: updatedProduct });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        await products_manager.deleteProductById(pid);
        res.status(200).json({ ok: true, message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};
