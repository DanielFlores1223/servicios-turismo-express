import { Request, Response } from 'express';
import fs from 'fs-extra';//para eliminar foto
import path from 'path';

// Models
import Restaurante, { IRestaurante } from '../models/Restaurante';//importamos el modelo

export async function getRestaurantes(req: Request, res: Response): Promise<Response> {
    const restaurantes = await Restaurante.find();
    return res.json(restaurantes);
};

export async function createRestaurante(req: Request, res: Response): Promise<Response> {
    const { nombreRes, descripcion, direccion, link } = req.body;
    const newRestaurante = { nombreRes, descripcion, direccion, link, imagePath: req.file.path };
    const restaurante = new Restaurante(newRestaurante);
    await restaurante.save();
    return res.json({
        message: 'Restaurante guardado Satisfactoriamente',
        restaurante
    });
};

export async function getRestaurante(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const restaurante = await Restaurante.findById(id);
    return res.json(restaurante);
};

export async function deleteRestaurante(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const restaurante = await Restaurante.findByIdAndRemove(id);
    if (restaurante) {
        await fs.unlink(path.resolve(restaurante.imagePath));
    }
    return res.json({ message: 'Restaurante eliminado' });
};

export async function updateRestaurante(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombreRes, descripcion, direccion, link } = req.body;
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(id, {
        nombreRes, 
        descripcion, 
        direccion, 
        link
    });
    return res.json({
        message: 'Restaurante modificado',
        updatedRestaurante
    });
}