const argv = require("./config/yargs").argv;
const colors = require("colors");
const { guardarDB, leerDB } = require("./helpers/interaccionesDB");
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasCompletar } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas();
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await listadoTareasCompletar(tareas.listadoArr);
        tareas.toggleCompletadas(ids)
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const borrarConfirm = await confirmar(`¿Está seguro?`);
          if (borrarConfirm) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
      case '0':
        console.log('Hasta pronto!');
        break;
      default:
        console.log("El comando no es reconocido");
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
