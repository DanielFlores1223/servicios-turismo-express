import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombre: String,
    telefono: String,
    link: String,
    descripcion: String,
    imagePath: String
});

export interface IHotel extends Document {
    nombre: string;
    telefono: string;
    link: string;
    descripcion: string;
    imagePath: string;
}

export default model<IHotel>('Hotel', schema);