const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    // cuando encuentra una descripcion de tarea que coincide con la que pasamos
    // por parámetro, cambia el completado al completado que le hayamos pasado como parámetro
    // y lo guarda
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return `Se ha actualizado el estado de 'Completado' de la tarea '${listadoPorHacer[index].descripcion}' a ${listadoPorHacer[index].completado}`;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    // con .filter() creamos un nuevo array con las tareas que no coinciden
    // con la que le pasamos como parámetro
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListado.length === listadoPorHacer.length) {
        return 'No se ha borrado la tarea';
    } else {
        // Si tienen distinta longitud los arrays, guardamos nuevoListado
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const getlistado = (completado) => {
    cargarDB();
    if (completado === undefined) {
        return listadoPorHacer;
    }
    return listadoPorHacer.filter(tarea => tarea.completado === JSON.parse(completado));
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    console.log(listadoPorHacer);
}

module.exports = {
    crear,
    getlistado,
    actualizar,
    borrar
}