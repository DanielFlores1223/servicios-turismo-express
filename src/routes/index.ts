import { Router } from 'express'
const router = Router();//ejecutamos y me devuelve un objeto para colocar rutas o url en el servidor

import upload from '../libs/multer'//importamos el objeto upload
import { getEmpresas, createEmpresa, deleteEmpresa, getEmpresa, updateEmpresa, getEstatusEmpresa, updateEstatusEmpresa, getEmpresasGiro } from '../controllers/empresa.controller'
import { getEventos, createEvento, deleteEvento, getEvento, updateEvento } from '../controllers/evento.controller'
import { getHoteles, createHotel, deleteHotel, getHotel, updateHotel } from '../controllers/hotel.controller'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'
import { getRestaurantes, createRestaurante, deleteRestaurante, getRestaurante, updateRestaurante } from '../controllers/restaurante.controller'
import { getSitios, createSitio, deleteSitio, getSitio, updateSitio } from '../controllers/sitio.controller'
import {getConteoHotel, getConteoUsuario,getConteoSitio,getConteoRestaurante,getConteoEvento,getConteoOtros} from '../controllers/conteo.controller'
import {createUsuario, login, getUsuarioId} from '../controllers/usuario.controller';

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

router.route('/empresas-estatus/:estatus')
      .get(getEstatusEmpresa);

router.route('/empresas-giro/:giro')
    .get(getEmpresasGiro);

//Rutas de Eventos
    router.route('/eventos')
    .get(getEventos)
    .post(upload.single('image'), createEvento);

router.route('/eventos/:id')
    .get(getEvento)
    .delete(deleteEvento)
    .put(updateEvento);


    router.route('/hoteles')
    .get(getHoteles)
    .post(upload.single('image'), createHotel);

router.route('/hoteles/:id')
    .get(getHotel)
    .delete(deleteHotel)
    .put(updateHotel);


    router.route('/restaurantes')
    .get(getRestaurantes)
    .post(upload.single('image'), createRestaurante);

router.route('/restaurantes/:id')
    .get(getRestaurante)
    .delete(deleteRestaurante)
    .put(updateRestaurante);


router.route('/sitios')
    .get(getSitios)
    .post(upload.single('image'), createSitio);

router.route('/sitios/:id')
    .get(getSitio)
    .delete(deleteSitio)
    .put(updateSitio);

router.route('/usuario')
    .post(createUsuario);

router.route('/usuario/:id')
    .get(getUsuarioId);

router.route('/login')
    .post(login);

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

export default router;