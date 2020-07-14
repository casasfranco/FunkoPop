import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
//Class
import Funko from "./funko.js";

let listaFunko = [];
console.log("listaFunko despues de declarar");
console.log(listaFunko);
leerProductos();

//window para poder llamarla desde el html
window.agregarFunko = function (event) {
  event.preventDefault();
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;
  //validar los datos del formulario

  console.log(listaFunko);

  let nuevoFunko = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen,
    precio
  );

  console.log("objeto funko");
  console.log(nuevoFunko);

  listaFunko.push(nuevoFunko);

  localStorage.setItem("funko", JSON.stringify(listaFunko));

  limpiarForm();
  leerProductos();
};

function limpiarForm() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
}

//Lee los datos del localStorage
function leerProductos() {
  if (localStorage.length > 0) {
    //Guardo el localStorage
    let _listaFunko = JSON.parse(localStorage.getItem("funko"));
    console.log("localStorage");
    console.log(_listaFunko);
    console.log("array local");
    console.log(listaFunko);
    if (listaFunko.length == 0) {
      console.log("llegue a if");
      listaFunko = _listaFunko;
      console.log(listaFunko);
    }
    borrarTabla();
    dibujarTabla(_listaFunko);
  }
}

function dibujarTabla(listaFunko) {
  let tablafunko = document.getElementById("tablaFunko");
  let codHTML = "";

  for (let i in listaFunko) {
    codHTML = `<tr>
            <th scope="row">${listaFunko[i].codigo}</th>
            <td>${listaFunko[i].nombre}</td>
            <td>${listaFunko[i].numSerie}</td>
            <td>${listaFunko[i].categoria}</td>
            <td>${listaFunko[i].descripcion}</td>
            <td>${listaFunko[i].imagen}</td>
            <td>$${listaFunko[i].precio}</td>
            <td>
                <button class="btn btn-outline-warning mr-2" onclick="">Modificar</button>
                <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${listaFunko[i].codigo}">Eliminar</button>
            </td>
        </tr>`;
    tablafunko.innerHTML += codHTML;
  }
}

function borrarTabla() {
  let tablafunko = document.getElementById("tablaFunko");

  if (tablafunko.hasChildNodes()) {
    while (tablafunko.firstChild) {
      tablafunko.removeChild(tablafunko.firstChild);
    }
  }
}

window.eliminarProducto = function (botonEliminar) {
  if (localStorage.length > 0) {
    let _listaFunko = JSON.parse(localStorage.getItem("funko"));

    //Filtrar datos del arreglo
    let datosFiltrados = _listaFunko.filter(
      (item) => item.codigo != botonEliminar.id
    );
  }
  console.log(botonEliminar);
};
