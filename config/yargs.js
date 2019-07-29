const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    type: 'boolean',
    desc: 'Marca la tarea como completada o pendiente'
};
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {descripcion})
    .command('actualizar', 'Actualiza el estado completo de una tarea', {descripcion, completado})
    .command('borrar', 'Borra una tarea', {descripcion})
    .command('listar', 'Lista las tareas por un filtro', {completado})
    .help()
    .argv;

module.exports = {
    argv
}