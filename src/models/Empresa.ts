import { Schema, model, Document } from 'mongoose';

//Considerado Eliminar
/*const schema = new Schema({
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
}*/

const schema = new Schema({
    nombreEmpresa: String,
    giro: String,
    paginaWeb: String,
    facebook: String,
    twitter: String,
    telefono: String,
    imagePath: String,
    estatus: String,
    descripcion: String,
    idComerciante: String,
    observaciones: String

});

export interface IEmpresa extends Document {
    nombreEmpresa: string;
    giro: string;
    paginaWeb: string,
    facebook: string,
    twitter: string  
    telefono: string;
    imagePath: string;
    estatus: string,
    descripcion: string,
    idComerciante: string,
    observaciones: string
}

export default model<IEmpresa>('Empresa', schema);