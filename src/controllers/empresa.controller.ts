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
    const { nombreEmpresa, 
            giro, 
            telefono, 
            estatus, 
            descripcion, 
            idComerciante ,
            paginaWeb,
            facebook, 
            twitter } = req.body;

    const newEmpresa = { 
        nombreEmpresa, 
        giro,  
        telefono, 
        imagePath: req.file.path, 
        estatus,
        paginaWeb,
        facebook,
        twitter,
        descripcion,
        idComerciante

    };

    const empresa = new Empresa(newEmpresa);
    await empresa.save();
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

export async function getEstatusEmpresa(req: Request, res: Response): Promise<Response> {
    const {estatus} = req.params;
    let empresasFiltradas;

    if (estatus === 'Todos') {
        empresasFiltradas = await Empresa.find();
    }else{
        empresasFiltradas = await Empresa.find({ estatus: estatus });
    }
   
    return res.json(empresasFiltradas);
}


//En esta funcion se filtra por el giro ademas de que la empresa cuente con el estatus validado
export async function getEmpresasGiro(req: Request, res: Response): Promise<Response> {
    const {giro} = req.params;
    let empresasFiltradas;
   
    if(giro == 'Todos'){
        empresasFiltradas = await Empresa.find({estatus: 'Validado'});
    }else{
        empresasFiltradas = await Empresa.find({'$and': [ {giro: giro}, {estatus: 'Validado'} ]});
    }
        
    return res.json(empresasFiltradas);
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
    const { nombreEmpresa, giro, paginaWeb, telefono, facebook, twitter, descripcion } = req.body;
    const updatedEmpresa = await Empresa.findByIdAndUpdate(id, {
        nombreEmpresa,
        giro,
        paginaWeb,
        telefono,
        facebook,
        twitter,
        descripcion
    });
    
    return res.json({
        message: 'Empresa modificada',
        updatedEmpresa
    });
    
}

export async function updateEmpresaImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const empresaImage = await Empresa.findById(id);

    if(empresaImage){
        //Eliminamos la imagen del servidor
        await fs.unlink(path.resolve(empresaImage.imagePath));
    }

    const updatedEmpresa = await Empresa.findByIdAndUpdate(id, {
        imagePath: req.file.path
    },
    {   
        //devuelve el objeto con las modificaciones hechas
        new: true
    });
    
    return res.json({
        message: 'Empresa modificada image',
        updatedEmpresa
    });
    
}

export async function updateEstatusEmpresa(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const { estatus } = req.body;
    const updateEstatus = await Empresa.findByIdAndUpdate(id, {
        estatus
    },
    {
        new: true
    });

    return res.json({
        mensaje: 'Estatus modificado', 
        updateEstatus
    });
}
