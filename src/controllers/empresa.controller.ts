import { Request, Response } from 'express';//importamos los objetos res y response
import fs from 'fs-extra';//para eliminar foto
import path from 'path';

// Models
import Empresa, { IEmpresa } from '../models/Empresa';//importamos el modelo

export async function getEmpresas(req: Request, res: Response): Promise<Response> {
    const empresas = await Empresa.find();
    return res.json(empresas);
};

export async function createEmpresa(req: Request, res: Response): Promise<Response> {
    const { nombreEmpresa, giro, redsocial, telefono } = req.body;
    const newEmpresa = { nombreEmpresa, giro, redsocial, telefono, imagePath: req.file.path };
    const empresa = new Empresa(newEmpresa);
    await empresa.save();//await porque es un metodo asincrono y va tomar algo de tiempo
    return res.json({
        message: 'Empresa guardada Satisfactoriamente',
        empresa
    });
};

export async function getEmpresa(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);
    return res.json(empresa);
};

export async function deleteEmpresa(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const empresa = await Empresa.findByIdAndRemove(id);
    if (empresa) {
        await fs.unlink(path.resolve(empresa.imagePath));
    }
    return res.json({ message: 'Empresa eliminada' });
};

export async function updateEmpresa(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombreEmpresa, giro, redsocial, telefono } = req.body;
    const updatedEmpresa = await Empresa.findByIdAndUpdate(id, {
        nombreEmpresa,
        giro,
        redsocial,
        telefono
    });
    return res.json({
        message: 'Empresa modificada',
        updatedEmpresa
    });
}