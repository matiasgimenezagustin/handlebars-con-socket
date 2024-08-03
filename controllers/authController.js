import User from '../models/user.model.js';
import cartsManager from '../managers/carts.manager.js';
import passport from '../passport.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const isFromHbs = req.headers['content-type'] === 'application/x-www-form-urlencoded'

        const { first_name, last_name, email, age, password } = req.body;
        const newUser = new User({ 
            first_name, 
            last_name, 
            email, 
            age, 
            password, 
            cart: await cartsManager.createCart(), 
            role: 'user'
        });
        await newUser.save();
        if(isFromHbs) {
            res.redirect('/auth/login')
        }
        else{
            res.status(201).json(
                { 
                    message: 'User registered successfully'
                }
            );
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error registering user', error: err });
    }
}


export const loginController = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });

        const isFromHbs = req.headers['content-type'] === 'application/x-www-form-urlencoded'
        if(isFromHbs) {
            return res.redirect('/products')
        }else{
            return res.json({ message: 'Logged in successfully', token });
        }
    })(req, res, next);
}