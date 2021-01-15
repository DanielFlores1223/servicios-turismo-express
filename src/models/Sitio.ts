import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    nombresitio: String,
    subtitulo: String,
    descripcioncorta: String,
    contenido1: String,
    contenido2: String,
    imagePath: String

});

export interface ISitio extends Document {
    nombresitio: string;
    subtitulo: string;
    descripcioncorta: string;
    contenido1: string;
    contenido2: string;
    imagePath: string;


}

export default model<ISitio>('Sitio', schema);