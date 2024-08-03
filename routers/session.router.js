import express from 'express'
import passport from '../passport.js'
const sessionRouter = express.Router()


const getCurrentSessionController = (req, res) => {
    res.json(
        { 
            message: 'You have accessed a protected route using a cookie!', 
            user: req.user 
        }
    );
}
sessionRouter.get('/current', passport.authenticate('jwt-cookie', { session: false }), getCurrentSessionController);




export default sessionRouter