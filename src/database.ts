import { connect } from 'mongoose'//importamos el modulo mongoose para conectar y establcer modelos en la bd

export async function startConnection() {
    //mongodb+srv://dav67891h:pPFPpg948AJ4jfWW@cluster0.0oalz.mongodb.net/imagenes
    //mongodb+srv://tania_1201:jipistri1201@cluster0.utosf.mongodb.net/imagenes
    const db = await connect('mongodb+srv://dav67891h:pPFPpg948AJ4jfWW@cluster0.0oalz.mongodb.net/imagenes',{
        //aqui pongan los parametros de su cluster de mongodb
        useNewUrlParser: true,
        useFindAndModify: false ,
        useCreateIndex: true
    });
    console.log('Database is connected');
}