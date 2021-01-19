import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';

// Models
import Sitio, { ISitio } from '../models/Sitio';

export async function getSitios(req: Request, res: Response): Promise<Response> {
    const sitios = await Sitio.find();
    return res.json(sitios);
};

export async function createSitio(req: Request, res: Response): Promise<Response> {
    const { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2 } = req.body;
    const newSitio = { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2, imagePath: req.file.path };
    const sitio = new Sitio(newSitio);
    await sitio.save();
    return res.json({
        message: 'Sitio guardado Satisfactoriamente',
        sitio
    });
};

export async function getSitio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const sitio = await Sitio.findById(id);
    return res.json(sitio);
};

export async function deleteSitio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const sitio = await Sitio.findByIdAndRemove(id);
    if (sitio) {
        await fs.unlink(path.resolve(sitio.imagePath));
    }
    return res.json({ message: 'Sitio eliminado' });
};

export async function updateSitio(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2 } = req.body;
    const updatedSitio = await Sitio.findByIdAndUpdate(id, {
        nombresitio, 
        subtitulo, 
        descripcioncorta, 
        contenido1, 
        contenido2 
    });
    return res.json({
        message: 'Sitio modificado',
        updatedSitio
    });
}