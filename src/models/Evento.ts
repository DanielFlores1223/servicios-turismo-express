import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombreEvento: String,
    direccion: String,
    fecha_inicio: String,
    fecha_fin: String,
    descripcion: String,
    imagePath: String
});

export interface IEvento extends Document {
    nombreEvento: string;
    direccion: string;
    fecha_inicio: string;
    fecha_fin: string;
    descripcion: string;
    imagePath: string;
}

export default model<IEvento>('Evento', schema);