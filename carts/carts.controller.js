import cartsManager from "./carts.manager.js"

export const postCart = async (req, res) =>{
    try{
        await cartsManager.createCart()
        res.status(201).json({ok: true, message: 'Cart created'})
    }
    catch(error){
        res.status(500).json({ok: false, error: error.message})
    }
} 

export const getCartById = (req, res) =>{
    try{
        const {cid} = req.params

        if(!isNaN(cid)){
            throw {message: 'Cart id must be a string'}
        }
        const cartSelected = cartsManager.getCartById(cid)
        if(cartSelected){
            res.status(200).json({ok: true, payload: cartSelected})
        }
        else{
            res.status(404).json({ok: false, message: 'Cart not found'})
        }
    }
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

export const postProductToCart = async (req, res) =>{
    try{
        const {cid, pid} = req.params
        if(!isNaN(cid)){
            throw {message: 'Cart id must be a string'}
        }
        if(!isNaN(pid)){
            throw {message: 'Product id must be a string'}
        }
        const cart = await cartsManager.addProductToCart(cid, pid)
        res.status(200).json({ok: true, payload: cart})
    }
    catch(error){
        res.status(400).json({ok: false, error: error.message})
    }
}

