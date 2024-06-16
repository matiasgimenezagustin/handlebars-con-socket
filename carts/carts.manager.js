import fs from 'fs'
import { v4 as uuid} from 'uuid'


class CartManager {
    constructor(path){
        this.path = path
        this.carts = []
        this.init()
    }
    async init() {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            if(carts){
                this.carts = JSON.parse(carts)
            }
            else{
                this.carts = []
                await this.save()
            }
        } catch (error) {
            console.error(`No existent file ${this.path}:`, error);
            this.carts = [];
            await this.save()
        }
    }

    async save() {
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')
        }
        catch(error){
            console.error('Can not save ' + this.path)
        }
    }

    async createCart(){
        const cartId = uuid()
        this.carts.push({id: cartId, products: []})
        await this.save()
        return cartId
    }
    getCartById(cid){
        return this.carts.find(cart => cart.id === cid)
    }
    async addProductToCart(cid, pid){
        const cart = this.getCartById(cid)

        if(cart){
            const existentItem = cart.products.find(item => item.pid === pid)
            if(existentItem){
                existentItem.quantity++
            }
            else{
                cart.products.push({pid: pid, quantity: 1})
            }
        }
        else{
            throw {message: 'Cart with id ' + cid + ' not found'}
        }
        await this.save()
        return cart
    }
}


const cartsManager = new CartManager('./carts/carts.json')

export default cartsManager