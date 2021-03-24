import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';

// Models
import Sitio, { ISitio } from '../models/Sitio';

export async function getSitios(req: Request, res: Response): Promise<Response> {
    const sitios = await Sitio.find();
    return res.json(sitios);
};

export async function getSitiosCategoria(req: Request, res:Response): Promise<Response> {
   const { categoria } = req.params;

   const sitios = await Sitio.find({categoria: categoria});

   return res.json(sitios);
}

export async function createSitio(req: Request, res: Response): Promise<Response> {
    const { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2, categoria} = req.body;
    const newSitio = { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2, imagePath: req.file.path, categoria };
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
    const { nombresitio, subtitulo, descripcioncorta, contenido1, contenido2, categoria } = req.body;
    const updatedSitio = await Sitio.findByIdAndUpdate(id, {
        nombresitio, 
        subtitulo, 
        descripcioncorta, 
        contenido1, 
        contenido2,
        categoria 
    });
    return res.json({
        message: 'Sitio modificado',
        updatedSitio
    });
}

export async function updateSitioImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const sitioImage = await Sitio.findById(id);

    if (sitioImage) {
        //Eliminamos la imagen del servidor
        await fs.unlink(path.resolve(sitioImage.imagePath));
    }

    const updatedSitio = await Sitio.findByIdAndUpdate(id, {
       imagePath: req.file.path
    });
    
    return res.json({
        message: 'Sitio imagen modificado',
        updatedSitio
    });
}