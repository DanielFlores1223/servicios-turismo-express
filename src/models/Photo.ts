import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

export interface IPhoto extends Document {//UNA INTERFAZ es una descripcion de un objeto auqui trabajamos con typescript por eso es pone s minusculas
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', schema);// este modelo va a tener que cumplir con la estruc de la interfaz de las fotos <IPhoto>