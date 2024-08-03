import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

const authRouter = express.Router()





authRouter.post('/login' , loginController)

authRouter.post('/register' , registerController)



/* app.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, cart, role } = req.body;

    try {
        const newUser = new User({ first_name, last_name, email, age, password, cart, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error registering user', error: err });
    }
}); */

// Ruta de login
/* app.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        // Generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        // Enviar el token en una cookie
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.json({ message: 'Logged in successfully', token });
    })(req, res, next);
});
 */

export default authRouter