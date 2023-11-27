let table = document.getElementById('table');
let cartItems = localStorage.getItem("cart-items") || [];

// Función para crear la tabla
function crearTabla() {

    // Crear la tabla y el encabezado
    let tabla = document.createElement('table');
    let encabezado = document.createElement('thead');
    let filaEncabezado = document.createElement('tr');

    // Crear las celdas del encabezado
    let encabezados = ['ID', 'Imagen', 'Nombre', 'Precio', 'Cantidad'];
    encabezados.forEach(function (textoEncabezado) {
      let celda = document.createElement('th');
      celda.textContent = textoEncabezado;
      filaEncabezado.appendChild(celda);
    });

    // Agregar la fila del encabezado al encabezado de la tabla
    encabezado.appendChild(filaEncabezado);
    tabla.appendChild(encabezado);

    // Crear el cuerpo de la tabla
    let cuerpoTabla = document.createElement('tbody');

    // Iterar sobre los datos y crear filas
    JSON.parse(cartItems).forEach(function (producto) {
      let fila = document.createElement('tr');

      // Crear celdas para cada propiedad del producto
      Object.keys(producto).forEach(function (key) {
        let celda = document.createElement('td');
        celda.textContent = producto[key];
        fila.appendChild(celda);
      });

      // Agregar la fila al cuerpo de la tabla
      cuerpoTabla.appendChild(fila);
    });

    // Agregar el cuerpo de la tabla a la tabla
    tabla.appendChild(cuerpoTabla);

    // Agregar la tabla al table
    table.appendChild(tabla);
  }


document.addEventListener("DOMContentLoaded", () => {
    crearTabla();
});
