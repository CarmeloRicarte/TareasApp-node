const argv = require("./config/yargs").argv;
const colors = require("colors");
const { mostrarMenu, pausa } = require("./helpers/mensajes");

const main = async () => {
  let opt = "";
  do {
    opt = await mostrarMenu();
    console.log({ opt });
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
/* switch (comando) {
  case "crear":
    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;
  case "listar":
    let listado = porHacer.getlistado(argv.completado);
    for (let tarea of listado) {
      console.log("=====Por Hacer=====".green);
      console.log(tarea.descripcion);
      console.log("Estado: ", tarea.completado);
      console.log("===================\n".green);
    }
    break;
  case "actualizar":
    let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
    console.log(actualizado);
    break;

  case "borrar":
    let borrado = porHacer.borrar(argv.descripcion);
    console.log(borrado);
    break;
  default:
    console.log("El comando no es reconocido");
    break;
} */
