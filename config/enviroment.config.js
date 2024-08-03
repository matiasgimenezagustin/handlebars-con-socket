import dotenv from 'dotenv'
dotenv.config()


const ENVIROMENT = {
    'JWT_SECRET_KEY': process.env.JWT_SECRET_KEY,
    'PORT': process.env.PORT || 8080,
    'SECRET_KEY': process.env.SECRET_KEY,
    'DB_NAME': process.env.DB_NAME
}

export default ENVIROMENT