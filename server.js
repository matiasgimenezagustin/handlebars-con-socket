import ENVIROMENT from './config/enviroment.config.js'

import express from 'express'

import {productsRouter, productsPageRouter} from './routers/products.router.js'
import cartRouter, { cartTemplateRouter } from './routers/carts.router.js'
import sessionRouter from './routers/session.router.js'

import hbs from 'express-handlebars'
import session from 'express-session';
import http from 'http'
import {Server} from 'socket.io'
import { products_manager } from './managers/products.manager.js'
import passport from './passport.js'
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.js'
import pageAuthRouter from './routers/pageAuth.router.js'
import conectionMongoose from './config/database.config.js'

const PORT = ENVIROMENT.PORT
const app = express()

app.engine('handlebars', hbs.engine({
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true 
    }
}))
app.set('view engine', 'handlebars')
app.set('views', './views'); 
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use(session({
    secret: ENVIROMENT.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Test de ruta protegida con JWT ', user: req.user });
});


app.use('/products', productsPageRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/cart', cartTemplateRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/auth', authRouter)
app.use('/auth', pageAuthRouter)

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

