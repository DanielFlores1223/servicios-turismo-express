var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');
const usuarios = mongoose.model('usuarios');

router.get('/', async(req, res, next) => {
    const usuario = await usuarios.find(function(err, usuario) {
        if (err) { next(err) }
        res.json(usuario)
    })
});


router.post('/', [
    check('nombre').isLength({ min: 1 }),
    check('email').isLength({ min: 1 }),
    check('direccion').isLength({ min: 1 }),
    check('telefono').isLength({ min: 1 }),
    check('password').isLength({ min: 1 }),
    check('tipo').isLength({ min: 1 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let usuario = await usuarios.findOne({ email: req.body.email })
    if (usuario) {
        return res.status(400).send('correo ya regitrado')
    }

    const salt = await await bcrypt.genSalt(10)

    const passcifrado = await bcrypt.hash(req.body.password, salt)

    usuario = new usuarios({
        nombre: req.body.nombre,
        email: req.body.email,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        password: passcifrado,
        tipo: req.body.tipo
    });
    await usuario.save()
    res.status(200).send(usuario)
})


router.post('/login', [
    check('email'),
    check('password'),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let usuario = await usuarios.findOne({ email: req.body.email })

    if (!usuario) {
        return res.status(400).send('correo o contraseña incorrecto')
    }
    const validacontra = await bcrypt.compare(req.body.password, usuario.password)

    if (!validacontra) {
        return res.status(400).send('correo o contraseña incorrecto')
    }
    const jwtoken = usuario.generadorJWT();
    const envio = [jwtoken + ",", usuario.nombre + ",", usuario.tipo]
    res.status(201).send({ envio })
})


router.put('/:codigo', auth, async(req, res) => {
    let usuario = await usuarios.findOne({ email: req.params.email })
    if (!usuario) {
        return res.status(400).send("usuario no encontrado")
    }
    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.body.password, salt),

        usuario_mod = await usuarios.findByIdAndUpdate({
            email: req.body.email
        }, {
            nombre: req.body.nombre,
            email: req.body.email,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            password: passcifrado,
            tipo: req.body.tipo
        }, {
            new: true
        })
    res.send(usuario_mod)
})


router.post('/modificar/:id', async(req, res) => {

    let usuairo = await usuarios.findOne({ _id: req.params.id })
    if (!usuairo) {
        return res.status(400).send("usuario no encontrado")
    }

    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.body.password, salt)

    usuario_mod = await usuarios.findOneAndUpdate({ _id: req.params.id}, {
        nombre: req.body.nombre,
        email: req.body.email,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        password: passcifrado,
        tipo: req.body.tipo
    }, {
        new: true
    })

    res.send(usuario_mod)
})
router.get('/ver/:id',async(req,res)=>{
    let usuario = await usuarios.findOne({ _id: req.params.id })
    if (!usuario) {
        return res.status(400).send("usuario no encontrado")
    }
    return res.send(usuario).status(201)
  })

router.post('/eliminar', async(req, res) => {
    console.log(req.body)
    let usuario = await usuarios.findOne({ _id: req.body.id })
    if (!usuario) {
        return res.status(400).send("usuario no encontrado")
    }
    await usuarios.findOneAndDelete({ _id: req.body.id }, function(err, usuarioeliminado) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'usuairo eliminado' })
    })
})

module.exports = router;