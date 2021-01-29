import { Request, Response } from 'express';
import { mongo, Mongoose } from 'mongoose';

// Models
import Restaurante, { IRestaurante } from '../models/Restaurante';//importamos el modelo
import Evento,{IEvento}from '../models/Evento';
import Hotel,{IHotel}from '../models/Hotel';
import Sitio,{ISitio}from '../models/Sitio';
const mongoose=require('mongoose');
const Comerciante= mongoose.model('comerciantes');

export async function getConteoHotel(req: Request, res: Response): Promise<Response> {
    const cont = await Hotel.find().count();  //retorna el numero de todos las hoteles almacenados
    return res.json(cont);
};
export async function getConteoUsuario(req: Request, res: Response): Promise<Response> {
    const cont = await Comerciante.find().count();//retorna el numero de todos las empresas almacenados
    return res.json(cont);
};
export async function getConteoSitio(req: Request, res: Response): Promise<Response> {
    const cont = await Sitio.find().count();//retorna el numero de todos las sitios almacenados
    return res.json(cont);
};
export async function getConteoRestaurante(req: Request, res: Response): Promise<Response> {
    const cont = await Restaurante.find().count();//retorna el numero de todos las restaurante almacenados
    return res.json(cont);
};
export async function getConteoEvento(req: Request, res: Response): Promise<Response> {
    const cont = await Evento.find().count();//retorna el numero de todos las eventos almacenados
    return res.json(cont); 
};