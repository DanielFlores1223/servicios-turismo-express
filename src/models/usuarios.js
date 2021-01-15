const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);
 
const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    direccion:{
        type: String,
        require:true
    },
    telefono:{
        type: Number,
        require:true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    tipo:{
        type: String,
        required: false
    }
})
usuarioSchema.methods.generadorJWT = function() {
    return jwt.sign({
        nombre: this.nombre,
        email: this.email
    }, "password")
}

mongoose.model('usuarios', usuarioSchema);