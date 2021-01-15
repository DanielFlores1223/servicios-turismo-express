import { Request, Response } from 'express';//importamos los objetos res y response
import fs from 'fs-extra';//para eliminar foto
import path from 'path';

// Models
import Evento, { IEvento } from '../models/Evento';//importamos el modelo

export async function getEventos(req: Request, res: Response): Promise<Response> {
    const eventos = await Evento.find();
    return res.json(eventos);
};

export async function createEvento(req: Request, res: Response): Promise<Response> {
    const { nombreEvento, direccion, fecha_inicio, fecha_fin, descripcion } = req.body;
    const newEvento = { nombreEvento, direccion, fecha_inicio, fecha_fin, descripcion, imagePath: req.file.path };
    const evento = new Evento(newEvento);
    await evento.save();
    return res.json({
        message: 'Evento guardado Satisfactoriamente',
        evento
    });
};

export async function getEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const evento = await Evento.findById(id);
    return res.json(evento);
};

export async function deleteEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const evento = await Evento.findByIdAndRemove(id);
    if (evento) {
        await fs.unlink(path.resolve(evento.imagePath));
    }
    return res.json({ message: 'Evento eliminado' });
};

export async function updateEvento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombreEvento, direccion, fecha_inicio, fecha_fin, descripcion } = req.body;
    const updatedEvento = await Evento.findByIdAndUpdate(id, {
        nombreEvento, 
        direccion, 
        fecha_inicio, 
        fecha_fin, 
        descripcion
    });
    return res.json({
        message: 'Evento modificado',
        updatedEvento
    });
}