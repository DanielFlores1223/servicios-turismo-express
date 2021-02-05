var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');
const comerciantes = mongoose.model('comerciantes');

router.get('/', async(req, res, next) => {
    const comerciante = await comerciantes.find(function(err, comerciante) {
        if (err) { next(err) }
        res.json(comerciante)
    })

});
router.post('/', [
    check('nombre').isLength({ min: 1 }),
    check('email').isLength({ min: 1 }),
    check('numerosocio').isLength({ min: 1 }),
    check('password').isLength({ min: 1 }),
    check('tipo').isLength({ min: 1 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let comerciante = await comerciantes.findOne({ numerosocio: req.body.numerosocio })
    if (comerciante) {
        return res.status(400).send('comerciante ya regitrado')
    }
    const salt = await await bcrypt.genSalt(10)

    const passcifrado = await bcrypt.hash(req.body.password, salt)


    comerciante = new comerciantes({
        nombre: req.body.nombre,
        password: passcifrado,
        email: req.body.email,
        numerosocio: req.body.numerosocio,
        tipo: req.body.tipo
    });
    await comerciante.save()
    res.status(200).send(comerciante)
})
router.post('/login', [
    check('email'),
    check('password'),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let comerciante = await comerciantes.findOne({ email: req.body.email })

    if (!comerciante) {
        return res.status(400).send('numero de socio o contraseña incorrecto')
    }
    const validacontra = await bcrypt.compare(req.body.password, comerciante.password)

    if (!validacontra) {
        return res.status(400).send('numero de socio o contraseña incorrecto')
    }
    const jwtoken = comerciante.generadorJWT();
    const envio = [jwtoken, comerciante.nombre, comerciante.tipo, comerciante._id]
    res.status(201).send({ envio })
})

router.get('/ver/:numerosocio', async(req, res) => {
    let comerciante = await comerciantes.findOne({ numerosocio: req.params.numerosocio })
    if (!comerciante) {
        return res.status(400).send("usuario no encontrado")
    }
    const comercianteencontrado = await comerciantes.findOne({ numerosocio: req.params.numerosocio })

    if (comercianteencontrado) {
        return res.send(comercianteencontrado)
    }
    return res.send("Libro no encontrado")
})


router.put('/:codigo', auth, async(req, res) => {
    let comerciante = await comerciantes.findOne({ numerosocio: req.params.numerosocio })
    if (!comerciante) {
        return res.status(400).send("usuario no encontrado")
    }
    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.params.password, salt),

        usuario_mod = await comerciantes.findByIdAndUpdate({
            numerosocio: req.params.numerosocio
        }, {
            nombre: req.body.nombre,
            password: passcifrado,
            email: req.body.email,
            numerosocio: req.body.numerosocio,
            tipo: req.body.tipo
        }, {
            new: true
        })
    res.send(usuario_mod)
})

router.put('/modificar/:numerosocio', async(req, res) => {

    let comerciante = await comerciantes.findOne({ numerosocio: req.params.numerosocio })
    if (!comerciante) {
        return res.status(400).send("usuario no encontrado")
    }

    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.body.password, salt)

    usuario_mod = await comerciantes.findOneAndUpdate({ numerosocio: req.params.numerosocio }, {
        nombre: req.body.nombre,
        password: passcifrado,
        email: req.body.email,
        numerosocio: req.body.numerosocio,
        tipo: req.body.tipo
    }, {
        new: true
    })

    res.send(usuario_mod)
})
router.delete('/eliminar/:numerosocio', async(req, res) => {
    let comerciante = await comerciantes.findOne({ numerosocio: req.params.numerosocio })
    if (!comerciante) {
        return res.status(400).send("usuario no encontrado")
    }
    await comerciantes.findOneAndDelete({ numerosocio: req.params.numerosocio }, function(err, comercianteeliminado) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'usuairo eliminado' })
    })
})

module.exports = router;