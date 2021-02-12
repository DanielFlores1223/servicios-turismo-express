import { Request, Response } from 'express';
import path from 'path';
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');

//modelo
import Usuario, { IUsuario } from '../models/Usuario';

export async function getUsuarioId(req: Request, res: Response): Promise<Response> {
     const {id} = req.params;
     //validamos que el formato de id enviado sea el correcto para hacer la consulta
     if (id.match(/^[0-9a-fA-F]{24}$/)) {
          const usuario = await Usuario.findById(id);
          if (!usuario) {
               return res.status(404).send(false);
          }
     
          return res.status(201).send(usuario);
     }else{
          return res.status(400).send(false);
     }

    
};

export async function getUsuarioTipo(req: Request, res: Response): Promise<Response> {
     const {tipo} = req.params;
     
          const usuarios = await Usuario.find({tipo: tipo});
          if (!usuarios) {
               return res.status(404).send(false);
          }
     
          return res.status(201).send(usuarios);  
};

export async function createUsuario(req: Request, res: Response): Promise<Response> {
    const {nombre,
     email,
     direccion,
     telefono,
     password,
     tipo} = req.body;

     const usuarioExistente = await Usuario.findOne({email: email});

     if (usuarioExistente) {
          return res.status(404).json({mensaje: 'El correo esta registrado', usuarioExistente});
     }
 
     const salt = await bcrypt.genSalt(10);
     const passcifrado = await bcrypt.hash(password, salt)
     
     let newUsuario;
     if(tipo === 'admin'){
          newUsuario = {
          nombre,
          email,
          direccion,
          telefono,
          password: passcifrado,
          tipo
         }
     }else{
          //afiliado
           newUsuario = {
               nombre,
               email,
               password: passcifrado,
               tipo
              }
     }

    const usuario = new Usuario(newUsuario);
    await usuario.save();
    
     return res.json({mensaje: 'El usuario se guardo', usuario});
};

export async function updateUsuario(req: Request, res: Response): Promise<Response> {
     const {nombre,
      email,
      direccion,
      telefono,
      password,
      } = req.body;

      const {id} = req.params;
 
      const usuarioExistente = await Usuario.findById(id);
 
      if (!usuarioExistente) {
           return res.status(404).json({mensaje: 'Usuario no existe'});
      }
      
      let updateUsuario
      if (usuarioExistente.tipo === 'admin') {
          updateUsuario = await Usuario.findByIdAndUpdate(id, {
               nombre,
               direccion,
               telefono
           });
      }else{
           //afiliado
           updateUsuario = await Usuario.findByIdAndUpdate(id, {
               nombre,
           });
      }
      
      //en caso de que se requiera un cambio de contraseña
      if (password !== '') {
          const salt = await bcrypt.genSalt(10);
          const passcifrado = await bcrypt.hash(password, salt)
          const updatePass = await Usuario.findByIdAndUpdate(id, {
               password: passcifrado,
          });
      }
  
      return res.json({mensaje: 'El usuario se modificó correctamente', updateUsuario});
 };

export async function login(req: Request, res: Response): Promise<Response> {
     const {email, password} = req.body;

     const usuario = await Usuario.findOne({email: email});
     if (!usuario) 
          return res.status(404).json({mensaje: 'Correo o contraseña invalidos'});
     

     const validaContra = await bcrypt.compare(password, usuario.password)

     if (!validaContra) 
          return res.status(404).json({mensaje: 'Correo o contraseña invalidos'});
     
     //const jwtoken = usuario.generadorJWT();
     const envio = [usuario._id ,usuario.tipo];
     return res.status(201).send({ envio });
 };

 export async function deleteUsuario(req: Request, res: Response): Promise<Response> {
     const { id } = req.params;
     const usuario = await Usuario.findByIdAndRemove(id);
     
     return res.status(201).json({ message: 'Usuario eliminado' });
 };