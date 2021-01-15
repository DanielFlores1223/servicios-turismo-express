const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const comerciantesSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    numerosocio:{
        type: Number,
        require:true
    },
    password:{
        type: String,
        required:true
    },
    tipo:{
        type: String,
        required:true
    }
})
comerciantesSchema.methods.generadorJWT = function() {
    return jwt.sign({
        nombre: this.nombre,
        numerosocio: this.numerosocio
    }, "password")
}
mongoose.model('comerciantes', comerciantesSchema);