import { Router } from 'express'
const router = Router();//ejecutamos y me devuelve un objeto para colocar rutas o url en el servidor

import upload from '../libs/multer'//importamos el objeto upload
import { getEmpresas, createEmpresa, deleteEmpresa, getEmpresa, updateEmpresa, getEstatusEmpresa, updateEstatusEmpresa, getEmpresasGiro,updateEmpresaImage,solicitudesId, updateObservaciones } from '../controllers/empresa.controller';
import { getEventos, createEvento, deleteEvento, getEvento, updateEvento, updateEventoImage } from '../controllers/evento.controller';
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'
import { getSitios, createSitio, deleteSitio, getSitio, updateSitio, updateSitioImage, getSitiosCategoria } from '../controllers/sitio.controller';
import {getConteoHotel, getConteoUsuario,getConteoSitio,getConteoRestaurante,getConteoEvento,getConteoOtros,getConteoComercio} from '../controllers/conteo.controller'
import {createUsuario, login, getUsuarioId, deleteUsuario, getUsuarioTipo, updateUsuario} from '../controllers/usuario.controller';


// routes
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);//when te envie a travez de put,get,dele cualquier peticion vas a usar el metodo ()

//Rutas de Empresas
router.route('/empresas')
.get(getEmpresas)
.post(upload.single('image'), createEmpresa);

router.route('/empresas/:id')
    .get(getEmpresa)
    .delete(deleteEmpresa)
    .put(updateEstatusEmpresa);

router.route('/empresas-plus/:id')
    .put(updateEmpresa);

router.route('/empresas-image/:id')
      .put(upload.single('image'),updateEmpresaImage);

router.route('/empresas-observaciones/:id')
      .put(updateObservaciones);

router.route('/empresas-estatus/:estatus')
      .get(getEstatusEmpresa);

router.route('/empresas-giro/:giro')
    .get(getEmpresasGiro);

router.route('/empresas-solicitudes-usuario/:id')
    .get(solicitudesId);

//Rutas de Eventos
router.route('/eventos')
    .get(getEventos)
    .post(upload.single('image'), createEvento);

router.route('/eventos/:id')
    .get(getEvento)
    .delete(deleteEvento)
    .put(updateEvento);

router.route('/eventos-image/:id')
    .put(upload.single('image'), updateEventoImage);

//Rutas de Sitios turisticos
router.route('/sitios')
    .get(getSitios)
    .post(upload.single('image'), createSitio);

router.route('/sitios/:id')
    .get(getSitio)
    .delete(deleteSitio)
    .put(updateSitio);

router.route('/sitios-categoria/:categoria')
    .get(getSitiosCategoria);

router.route('/sitios-image/:id')
    .put(upload.single('image'),updateSitioImage);

//Rutas de Usuario
router.route('/usuario')
    .post(createUsuario);

router.route('/usuario/:id')
    .get(getUsuarioId)
    .delete(deleteUsuario)
    .put(updateUsuario);

router.route('/usuario-tipo/:tipo')
    .get(getUsuarioTipo);

router.route('/login')
    .post(login);

//Rutas para contar registros (Dashboard en front)
router.route('/conteo1')
    .get(getConteoHotel);
router.route('/conteo2')
    .get(getConteoUsuario);
router.route('/conteo3')
    .get(getConteoSitio);
router.route('/conteo4')
    .get(getConteoRestaurante);
router.route('/conteo5')
    .get(getConteoEvento);
router.route('/conteo6')
    .get(getConteoOtros);
router.route('/conteo7')
    .get(getConteoComercio);

export default router;