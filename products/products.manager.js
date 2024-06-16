import fs from 'fs'
import { v4 as uuid} from 'uuid'
import { validateArray, validateNumber, validateString, validateBoolean } from '../utils/validation.util.js'

class Property{
    constructor(name, validate, required, editable){
        this.name = name
        this.validate = validate
        this.required = required
        this.editable = editable
    }
}

class PropertyManager {
    constructor(properties){
        this.properties = properties
    }
    getEditableProperties(){
        return this.properties.filter(property => property.editable)
    }
    getAllProperties(){
        return this.properties
    }
    getRequiredProperties (){
        return this.properties.filter(property => property.required).map(property => property.name)
    }

    getPropertyByName(name){
        return this.properties.find(property => property.name === name)
    }

}




class ProductsManager {
    static PRODUCT_PROPERTIES = new PropertyManager( [
        new Property('title', validateString, true, true),
        new Property('description', validateString, true, true),
        new Property('code', validateString, true, true),
        new Property('price', validateNumber, true, true),
        new Property('thumbnails', validateArray, false, true),
        new Property('category', validateString, true, true),
        new Property('stock', validateNumber, true, true),
    ])
    constructor(path){
        this.path = path
        this.products = []
        this.init()
    }


    async init() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            if(products){
                this.products = JSON.parse(products)
            }
            else{
                this.products = []
                await this.save()
            }
        } catch (error) {
            console.error(`No existent file ${this.path}:`, error);
            this.products = [];
            await this.save()
        }
    }

    async save() {
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
        }
        catch(error){
            console.error('Can not save ' + this.path)
        }
    }

    async addProduct(product){

        try {
            for(const propertyToCreate in product){
                const property = ProductsManager.PRODUCT_PROPERTIES.getPropertyByName(propertyToCreate)
                if(property){
                    if(!property.validate(product[propertyToCreate])){
                        throw {message: `Property ${propertyToCreate} is invalid value`}
                    }
                }
                else{
                    throw {message: `Property ${propertyToCreate} is not a valid property to create a product`}
                }
            }


            const newProductProperties = Object.keys(product)
            const requiredProperties = ProductsManager.PRODUCT_PROPERTIES.getRequiredProperties()
            const missingProperties = []
            for(const requiredProperty of requiredProperties){
                if(!newProductProperties.includes(requiredProperty)){
                    missingProperties.push(requiredProperty)
                }
            }
            if(missingProperties.length > 0){
                throw {message: `Missing properties: [${missingProperties.join(', ')}] to create a product`}
            }
            const newProduct = {...product, id: uuid(), status: true}
            this.products.push(newProduct) 
            await this.save()
            return newProduct
        }
        catch(error){
            throw error
        }
    }

    async getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(pid){
        return this.products.find(product => product.id === pid)
    }

    async updateProductById(pid, updateProduct){
        try{
            const productToUpdate = this.getProductById(pid)
            if(productToUpdate){

                for(const propertyToUpdate in updateProduct){
                    const property = ProductsManager.PRODUCT_PROPERTIES.getPropertyByName(propertyToUpdate)
                    if(property){
                        if(!property.editable){
                            throw {message: `Property ${propertyToUpdate} is not editable`}
                        }
                        if(!property.validate(updateProduct[propertyToUpdate])){
                            throw {message: `Property ${propertyToUpdate} is invalid value`}
                        }
                        productToUpdate[propertyToUpdate] = updateProduct[propertyToUpdate]
                    }
                    else{
                        throw {message: `Property ${propertyToUpdate} is not a valid property to update a product`}
                    }
                }
                await this.save()
                return productToUpdate
            }
            else{
                throw {message: 'The product with id ' + pid + ' was not found'}
            }
        }
        catch(error){
            throw error
        }
    }

    async deleteProductById(pid){
        try{
            const productToDelete = this.getProductById(pid)
            if(!productToDelete){
                throw {message: 'Can not delete he product with id ' + pid + ' because was not found'}
            }
            this.products = this.products.filter(product => product.id != pid)
            await this.save()
        }
        catch(error){
            throw error
        }
    }
} 


export const products_manager = new ProductsManager('./products/products.json')



//create a json product to post and probe in postman
/* {
    "title": "Gorra",
    "description": "Gorra de cuero",
    "code": "123",
    "price": 100,
    "status": true,
    "stock": 10,
} */