import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
//require('./models/comerciantes');
//require('./models/usuarios');
//const comercianteRouter = require('./routes/comerciante');
//const usuarioRouter = require('./routes/usuario');

import indexRoutes from './routes/index'

// Initializations
const app: Application = express();

// Settings
//utliza process.env si no existe utliza el 4000
app.set('port', process.env.PORT || 4000);
app.use(cors({ 
     origin: '*' 
     //origin: 'https://camaracomercio.netlify.app/'
}));

// Middlewares
app.use(morgan('dev'));//utiliza el modulo morgan en la opcion de desarrollo
app.use(cors());//para comunicar los puertos 4000 y 4200
app.use(express.json());//configuracion para recibir y enviar archivos json

// Routes
app.use('/api', indexRoutes);
//app.use('/comerciante',comercianteRouter);
//app.use('/usuario', usuarioRouter);

app.use('/uploads', express.static(path.resolve('uploads')));//el metodo resolve dice desde el inicio de la app va a la carpeta uploads y esto es lo que el navegador puede acceder

export default app;

 
