import mongoose from "mongoose";
import validacaoPorRegex from "../funcoes/validacaoPorRegex";

const esquema = new mongoose.Schema(
    {
        nome:{
            type: String,
            required: 'é obrigatório!'
        },
        email:{
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            required: 'é obrigatório!',
            validate: {
                validator:(valor) => { return validacaoPorRegex(valor, "email")},
                message: 'inválido!'
            }
        },
        senha:{
            type: String,
            required: 'é obrigatório!',
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', esquema)
