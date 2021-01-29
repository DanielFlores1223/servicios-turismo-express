import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombreEmpresa: String,
    giro: String,
    redsocial: String,
    telefono: String,
    imagePath: String,
    estatus: String
});

export interface IEmpresa extends Document {
    nombreEmpresa: string;
    giro: string;
    redsocial: string;
    telefono: string;
    imagePath: string;
    estatus: string
}

export default model<IEmpresa>('Empresa', schema);