import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombreRes: String,
    descripcion: String,
    direccion: String,
    link: String,
    imagePath: String
});

export interface IRestaurante extends Document {
    nombreRes: string;
    descripcion: string;
    direccion: string;
    link: string;
    imagePath: string;
}

export default model<IRestaurante>('Restaurante', schema);