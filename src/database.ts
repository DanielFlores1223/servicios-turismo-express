import { connect } from 'mongoose'//importamos el modulo mongoose para conectar y establcer modelos en la bd

export async function startConnection() {
    const db = await connect('mongodb+srv://user:pass@cluster0.0oalz.mongodb.net/namebd',{
        //aqui pongan los parametros de su cluster de mongodb
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    console.log('Database is connected');
}