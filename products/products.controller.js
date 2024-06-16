import { products_manager } from './products.manager.js'


export const getProductsTemplateController = async (req, res) =>{
    try{
        const {limit} = req.query
        if(limit &&isNaN(limit)){
            throw {message: 'Limit must be a number'}
        }
        const products = await products_manager.getProducts(Number(limit))
        res.status(200).render('home',{ok: true, payload: products})
    }   
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const getProductsController = async (req, res) =>{
    try{
        const {limit} = req.query
        if(limit &&isNaN(limit)){
            throw {message: 'Limit must be a number'}
        }
        const products = await products_manager.getProducts(Number(limit))
        res.status(200).json({ok: true, payload: products})
    }   
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const getProductByIdController = (req, res) =>{
    try{
        const {pid} = req.params
        if(!isNaN(pid)){
            throw {message: 'product id must be a string'}
        }
        const product = products_manager.getProductById(pid)
        if(product){
            res.status(200).json({ok: true, payload: product})
        }
        else{
            res.status(404).json({ok: false, message: 'Product not found'})
        }
    }
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const postProductController = async (req, res) =>{
    try{
        const createdProduct = await products_manager.addProduct(req.body)
        res.status(201).json({ok: true, message: 'Product created', payload: createdProduct})
    }   
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const putProductController = async (req, res) =>{
    try{
        const {pid} = req.params
        if(!isNaN(pid)){
            throw {message: 'product id must be a string'}
        }
        const updatedProduct = await products_manager.updateProductById(pid, req.body)
        res.status(200).json({ok: true, message: 'Product updated', payload: updatedProduct})
    }
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const deleteProductController = async (req, res) =>{
    try{
        const {pid} = req.params
        if(!isNaN(pid)){
            throw {message: 'product id must be a string'}
        }
        await products_manager.deleteProductById(pid)
        res.status(200).json({ok: true, message: 'Product deleted'})
    }
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}