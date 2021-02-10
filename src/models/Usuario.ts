import { Schema, model, Document } from 'mongoose';
const jwt = require('jsonwebtoken');

const schema = new Schema({
     nombre:{
          type: String,
          require:true
      },
      email:{
          type: String,
          require:true
      },
      direccion:{
          type: String,
          require:true
      },
      telefono:{
          type: String,
          require:true
      },
      password:{
          type: String,
          required: true,
      },
      tipo:{
          type: String,
          required: false
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
      tipo: string
 }

 
 
 export default model<IUsuario>('Usuario', schema);