import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombreEmpresa: String,
    giro: String,
    redsocial: String,
    telefono: String,
    imagePath: String
});

export interface IEmpresa extends Document {
    nombreEmpresa: string;
    giro: string;
    redsocial: string;
    telefono: string;
    imagePath: string;
}

export default model<IEmpresa>('Empresa', schema);