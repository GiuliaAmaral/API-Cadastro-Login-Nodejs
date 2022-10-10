import mongoose from 'mongoose'


const MONGODB_URI = process.env.MONGODB_URI
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}



export default async function conectarBancoDados() {
    try {
        if (!MONGODB_URI) {
            throw new Error(`Defina a variável de ambiente MONGODB_URI para conectar com o banco de dados.`);
        }

        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false
            }

            cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
                return mongoose
            })
        }
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        console.error(error);
        throw new Error(`ValidationError: Não conseguimos se conectar ao banco de dados, tente novamente mais tarde.`);
    }
}