import conectionMongoose from "mongoose";


const url = `mongodb://localhost:27017/${process.env.DB_NAME}`;

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