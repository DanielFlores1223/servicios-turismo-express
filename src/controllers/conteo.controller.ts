import { Request, Response } from 'express';
import { mongo, Mongoose } from 'mongoose';

// Models
import Restaurante, { IRestaurante } from '../models/Restaurante';//importamos el modelo
import Evento,{IEvento}from '../models/Evento';
import Empresa,{IEmpresa}from '../models/Empresa';
import Sitio,{ISitio}from '../models/Sitio';
const mongoose=require('mongoose');
const Comerciante= mongoose.model('comerciantes');
const Giro="";
export async function getConteoHotel(req: Request, res: Response): Promise<Response> {
    const cont = await Empresa.find({$and:[{"giro":"Hotel"},{"estatus":"Validado"}]}).count();  //retorna el numero de todos las hoteles almacenados
    return res.json(cont);
};
export async function getConteoUsuario(req: Request, res: Response): Promise<Response> {
    const cont = await Empresa.find({$and:[{"giro":"Comercio"},{"estatus":"Validado"}]}).count();
    return res.json(cont);
};
export async function getConteoOtros(req: Request, res: Response): Promise<Response> {
    const conte = await Empresa.find({$and:[{"giro":"Otros"},{"estatus":"Validado"}]}).count();
    return res.json(conte);
};
export async function getConteoRestaurante(req: Request, res: Response): Promise<Response> {
    const cont = await Empresa.find({$and:[{"giro":"Restaurante"},{"estatus":"Validado"}]}).count();
    return res.json(cont);
};
export async function getConteoEvento(req: Request, res: Response): Promise<Response> {
    const cont = await Evento.find().count();//retorna el numero de todos las eventos almacenados
    return res.json(cont); 
};
export async function getConteoSitio(req: Request, res: Response): Promise<Response> {
    const cont = await Sitio.find().count();//retorna el numero de todos las eventos almacenados
    return res.json(cont); 
};