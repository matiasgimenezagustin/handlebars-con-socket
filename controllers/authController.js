import userRepository from '../repositories/user.repository.js';
import cartsRepository from '../repositories/cart.repository.js';
import UserDTO from '../dto/userDTO.js';
import passport from '../passport.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const isFromHbs = req.headers['content-type'] === 'application/x-www-form-urlencoded';

        const { first_name, last_name, email, age, password } = req.body;
        
        const newCart = await cartsRepository.createCart();

        const newUser = await userRepository.createUser({
            first_name,
            last_name,
            email,
            age,
            password,
            cart: newCart._id, 
            role: 'user'
        });

        if (isFromHbs) {
            res.redirect('/auth/login');
        } else {
            res.status(201).json({
                message: 'User registered successfully'
            });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user', error: err });
    }
}

export const loginController = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });

        const isFromHbs = req.headers['content-type'] === 'application/x-www-form-urlencoded';
        if (isFromHbs) {
            return res.redirect('/products');
        } else {
            const userDTO = new UserDTO(user);
            return res.json({ message: 'Logged in successfully', token, user: userDTO });
        }
    })(req, res, next);
}
