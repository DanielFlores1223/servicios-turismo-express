import { Request, Response } from 'express';//importamos los objetos res y response
import fs from 'fs-extra';//para eliminar foto
import path from 'path';

// Models
import Hotel, { IHotel } from '../models/Hotel';//importamos el modelo

export async function getHoteles(req: Request, res: Response): Promise<Response> {
    const hoteles = await Hotel.find();//retorna todas las hoteles almacenados
    return res.json(hoteles);
};

export async function createHotel(req: Request, res: Response): Promise<Response> {
    const { nombre, telefono, link, descripcion } = req.body;
    const newHotel = { nombre, telefono, link, descripcion, imagePath: req.file.path };//nuevo objeto newHotel
    const hotel = new Hotel(newHotel);
    await hotel.save();//await porque es un metodo asincrono y va tomar algo de tiempo
    return res.json({
        message: 'Hotel guardado Satisfactoriamente',
        hotel
    });
};

export async function getHotel(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    return res.json(hotel);
};

export async function deleteHotel(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndRemove(id);
    if (hotel) {
        await fs.unlink(path.resolve(hotel.imagePath));
    }
    return res.json({ message: 'Hotel eliminado' });
};

export async function updateHotel(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, telefono, link, descripcion } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, {
        nombre,
        telefono,
        link,
        descripcion
    });
    return res.json({
        message: 'Hotel modificado',
        updatedHotel
    });
}