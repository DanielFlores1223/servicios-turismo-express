import { connect } from 'mongoose'//importamos el modulo mongoose para conectar y establcer modelos en la bd

export async function startConnection() {
    //mongodb+srv://dav67891h:pPFPpg948AJ4jfWW@cluster0.0oalz.mongodb.net/imagenes
    //mongodb+srv://tania_1201:jipistri1201@cluster0.utosf.mongodb.net/imagenes
    const db = await connect('mongodb+srv://tania_1201:jipistri1201@cluster0.utosf.mongodb.net/imagenes',{
        //aqui pongan los parametros de su cluster de mongodb
        useNewUrlParser: true,
        useFindAndModify: false ,
        useCreateIndex: true
    });
    console.log('Database is connected');
}
// db.usuarios.insertOne(
//     {
//     "nombre":"snowy",
//     "email":"snowy@gmail.com",
//     "direccion":"Vallarta",
//     "telefono":3332145568,
//     "pasword":"$2b$10$RK/NEWVUMTzLQap3YAOfcODk.igONafHWV0wND8FtdMaVix7LSDk2",
//     "permisos":
//        {
//         "sitios":"con acceso",
//         "eventos":"con acceso",
//         "empresasValidadas":"con acceso",
//         "solicitudesEmpresas":"con acceso",
//         "administradores":"con acceso",
//         "afiliados":"con acceso",
//         "carrusel":"con acceso"
//        },
//      "tipo":"admin"
//     }
//    );
   