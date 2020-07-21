import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../css/style.css";
import Funko from "./funko.js";
import $ from "jquery";

//inicializo variables
let listaFunkos = [];
leerProductos();
let productoExistente = false; //cuando la variable sea "false" es igual a agregar un producto, y cuando es "true" es igual a modificar un producto

//function agregarFunko(event){
window.agregarFunko = function () {
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;
  //validar los datos del formulario

  let nuevoFunko = new Funko(
    codigo,
    nombre,
    numSerie,
    categoria,
    descripcion,
    imagen,
    precio
  );

  console.log(nuevoFunko);

  listaFunkos.push(nuevoFunko);
  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));

  limpiarFormulario();
  leerProductos();
};

function limpiarFormulario() {
  let formulario = document.getElementById("formProducto");
  formulario.reset();
  productoExistente = false;
}

function leerProductos() {
  if (localStorage.length > 0) {
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
    if (listaFunkos.length == 0) {
      listaFunkos = _listaFunkos;
    }
    //borrar tabla
    borrarTabla();
    //dibujar tabla
    dibujarTabla(_listaFunkos);
  }
}

function dibujarTabla(_listaFunkos) {
  let tablaFunko = document.getElementById("tablaFunko");
  let codHTML = "";

  for (let i in _listaFunkos) {
    codHTML = `<tr>
              <th scope="row">${_listaFunkos[i].codigo}</th>
              <td>${_listaFunkos[i].nombre}</td>
              <td>${_listaFunkos[i].numSerie}</td>
              <td>${_listaFunkos[i].categoria}</td>
              <td>${_listaFunkos[i].descripcion}</td>
              <td>${_listaFunkos[i].imagen}</td>
              <td>$${_listaFunkos[i].precio}</td>
              <td>
                <button class="btn btn-outline-info" onclick="modificarProducto(${_listaFunkos[i].codigo})">Editar</button>
                <button class="btn btn-outline-danger" onclick="eliminarProducto(this)" id="${_listaFunkos[i].codigo}">Eliminar</button>
              </td>
            </tr>`;

    tablaFunko.innerHTML += codHTML;
  }
}

function borrarTabla() {
  let tablaFunko = document.getElementById("tablaFunko");

  if (tablaFunko.children.length > 0) {
    while (tablaFunko.firstChild) {
      tablaFunko.removeChild(tablaFunko.firstChild);
    }
  }
}

window.eliminarProducto = function (botonEliminar) {
  if (localStorage.length > 0) {
    let _listaFunkos = JSON.parse(localStorage.getItem("funkoKey"));
    //Opcion 1
    // for (let i in _listaFunkos) {
    //     if (_listaFunkos[i].codigo == botonEliminar.id) {
    //     }
    // }
    //Opcion 2
    let datosFiltrados = _listaFunkos.filter(function (producto) {
      return producto.codigo != botonEliminar.id;
    });

    localStorage.setItem("funkoKey", JSON.stringify(datosFiltrados));
    leerProductos();
    listaFunkos = datosFiltrados;
  }
};

window.modificarProducto = function (codigo) {
  //Buscar el objeto del producto
  let objetoEncontrado = listaFunkos.find(function (producto) {
    return producto.codigo == codigo;
  });
  //Cargar los datos en el form
  document.getElementById("codigo").value = objetoEncontrado.codigo;
  document.getElementById("nombre").value = objetoEncontrado.nombre;
  document.getElementById("numSerie").value = objetoEncontrado.numSerie;
  document.getElementById("categoria").value = objetoEncontrado.categoria;
  document.getElementById("descripcion").value = objetoEncontrado.descripcion;
  document.getElementById("imagen").value = objetoEncontrado.imagen;
  document.getElementById("precio").value = objetoEncontrado.precio;
  //Abrir la ventana modal
  let ventanaModal = document.getElementById("modalFormulario");
  $(ventanaModal).modal("show");
  productoExistente = true;
};

window.agregarModificar = function (event) {
  event.preventDefault();
  if (productoExistente == false) {
    //quiero agregar un nuevo producto
    agregarFunko();
  } else {
    //modificar un producto
    guardarProductoModificado();
  }
};

function guardarProductoModificado() {
  let codigo = document.getElementById("codigo").value;
  let nombre = document.getElementById("nombre").value;
  let numSerie = document.getElementById("numSerie").value;
  let categoria = document.getElementById("categoria").value;
  let descripcion = document.getElementById("descripcion").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;

  for (let i in listaFunkos) {
    if (listaFunkos[i].codigo == codigo) {
      listaFunkos[i].nombre = nombre;
      listaFunkos[i].numSerie = numSerie;
      listaFunkos[i].categoria = categoria;
      listaFunkos[i].descripcion = descripcion;
      listaFunkos[i].imagen = imagen;
      listaFunkos[i].precio = precio;
    }
  }

  localStorage.setItem("funkoKey", JSON.stringify(listaFunkos));

  leerProductos();
  limpiarFormulario();

  let ventanaModal = document.getElementById("modalFormulario");
  $(ventanaModal).modal("hide");
}

