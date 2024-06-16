import express from 'express'
import {productsRouter, productsPageRouter} from './products/products.router.js'
import cartRouter from './carts/carts.router.js'
import hbs from 'express-handlebars'
import http from 'http'
import {Server} from 'socket.io'
import { products_manager } from './products/products.manager.js'

const PORT = 8080
const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './views'); 
app.use(express.static('public'));

app.use(express.json())

app.use('/products', productsPageRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)



app.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await products_manager.getProducts();
        res.render('realtimeProducts', { title: 'Productos en Tiempo Real', payload: products });
    }
    catch(error){
        console.log(error)
        res.status(400).render('realtimeProducts', {ok: false, error: error.message})
    }
});

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('newProduct', async (product) => {
        try{
            await products_manager.addProduct(product);
            const products = await products_manager.getProducts();
            io.emit('updateProducts', products);
        }
        catch(error){
            console.log(error)
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try{
            await products_manager.deleteProductById(productId);
            const products = await products_manager.getProducts();
            io.emit('updateProducts', products);
        }
        catch(error){
            console.log(error)
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});


server.listen(PORT, () => {
    console.log(`El servidor se está escuchando en http://localhost:${PORT}/`);
});

