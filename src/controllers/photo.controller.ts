//Este controlador se tomo para el carrusel de imagenes en el front

import { Request, Response } from 'express';//importamos los objetos res y response
import fs from 'fs-extra';//para eliminar foto
import path from 'path';

// Models
import Photo, { IPhoto } from '../models/Photo';//importamos todo el modelo Photo

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();//retorna todas las fotos almacenadas
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title } = req.body;//desde request body quiero extraer title y des
    const newPhoto = { title, imagePath: req.file.path };//nuevo objeto newPhoto
    const photo = new Photo(newPhoto);
    await photo.save();//await porque es un metodo asincrono y va tomar algo de tiempo
    return res.json({
        message: 'Foto Guardada Satisfactoriamente',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
};

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Foto eliminada' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title} = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title
    });
    return res.json({
        message: 'Imagen modificada',
        updatedPhoto
    });
}