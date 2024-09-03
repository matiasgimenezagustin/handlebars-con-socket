import ProductRepository from '../repositories/product.repository.js';
import ProductDTO from '../dto/ProductDTO.js';

export const addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await ProductRepository.addProduct(productData);
        const productDTO = new ProductDTO(newProduct);
        res.status(201).json({ status: 'success', payload: productDTO });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await ProductRepository.getProducts(req.query);
        const productDTOs = products.products.map(product => new ProductDTO(product));
        res.status(200).json({ 
            status: 'success', 
            payload: {
                ...products,
                products: productDTOs
            } 
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await ProductRepository.getProductById(req.params.pid);
        const productDTO = new ProductDTO(product);
        res.status(200).json({ status: 'success', payload: productDTO });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await ProductRepository.updateProductById(req.params.pid, req.body);
        const productDTO = new ProductDTO(updatedProduct);
        res.status(200).json({ status: 'success', payload: productDTO });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        await ProductRepository.deleteProductById(req.params.pid);
        res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};


