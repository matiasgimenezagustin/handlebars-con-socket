import express from 'express'
import { getCartById, postCart, postProductToCart } from './carts.controller.js'

const cartRouter = express.Router()


cartRouter.post('/', postCart)
cartRouter.get('/:cid', getCartById)
cartRouter.post('/:cid/product/:pid', postProductToCart)


export default cartRouter