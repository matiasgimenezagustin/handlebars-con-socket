import conectionMongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";


const url = `mongodb://localhost:27017/${ENVIROMENT.DB_NAME}`;
console.log(url)
conectionMongoose.connect(url)
.then(
    () => {
        console.log('Conexion exitosa')
    }
)
.catch(
    (error) => {
        console.error('Error al conectar MongoDB:', error)
    }
)
export default conectionMongoose