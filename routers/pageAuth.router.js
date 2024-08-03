import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'
const pageAuthRouter = express.Router()

pageAuthRouter.get('/login', (req, res) => {
    res.render('login', {})
})

pageAuthRouter.get('/register', (req, res) => {
    res.render('register', {})
})





pageAuthRouter.post('/login' , loginController)

pageAuthRouter.post('/register' , registerController)



export default pageAuthRouter