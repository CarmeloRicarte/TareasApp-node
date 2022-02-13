const Tarea = require('./tarea');
class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        // agregar tarea al listado
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            console.log(`${idx}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        if (completadas) {
            const listadoCompletadas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
            console.log('\n');
            listadoCompletadas.forEach((tarea, index) => {
                const idx = `${index + 1}`.green;
                console.log(`${idx}. ${tarea.desc} :: ${Date(tarea.completadoEn)}`);
            });
        } else {
            const listadoPendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);
            console.log('\n');
            listadoPendientes.forEach((tarea, index) => {
                const idx = `${index + 1}`.green;
                console.log(`${idx}. ${tarea.desc} :: ${'Pendiente'.red}`);
            });
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        // ponemos como pendientes las que desmarcamos que estaban completadas
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}



module.exports = Tareas;