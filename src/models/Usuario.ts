import { strictEqual } from 'assert';
import { Schema, model, Document } from 'mongoose';
const jwt = require('jsonwebtoken');

const schema = new Schema({
     nombre:{
          type: String,
          require:true
      },
      email:{
          type: String,
          require:true,
          unique: true
      },
      direccion:{
          type: String,
      },
      telefono:{
          type: String,
      },
      password:{
          type: String,
          required: true,
      },
      tipo:{
          type: String,
          required: false
      },
      permisos: {
          sitios: {type: String},
          eventos: {type: String},
          empresasValidadas: {type: String},
          solicitudesEmpresas: {type: String},
          administradores: {type: String},
          afiliados: {type: String},
          carrusel: {type: String}
      }
 });

 schema.methods.generadorJWT = function() {
     return jwt.sign({
         nombre: this.nombre,
         email: this.email
     }, "password")
 }

export interface IUsuario extends Document {
     nombre: string,
      email: string,
      direccion: string,
      telefono: string,
      password: string,
      tipo: string,
      permisos: {
        sitios: {type: string},
        eventos: {type: string},
        empresasValidadas: {type: string},
        solicitudesEmpresas: {type: string},
        administradores: {type: string},
        afiliados: {type: string},
        carrusel: {type: string}
    }
 }

 
 
 export default model<IUsuario>('Usuario', schema);