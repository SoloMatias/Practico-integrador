fetch('datos-higiene-personal.json')
  .then(response => response.json())
  .then(data => {
    // Aquí tienes acceso a tus datos de productos
    var productos = data;
    mostrarProductos(productos); // Pasa "todos" como categoría inicial

    // Resto del código del filtro
    // ...
  })
  .catch(error => {
    console.error('Error al cargar los datos de productos', error);
  });

// Función para mostrar los productos en el contenedor
function mostrarProductos(productos) {
  var contenedorProductos = document.getElementById("contenedor-productos");

  // Limpiar el contenedor de productos
  contenedorProductos.innerHTML = "";  
  
  // Mostrar los productos en el contenedor
  productos.forEach(function(producto) {
  var productoHTML = document.createElement("div");
  productoHTML.style.width = "50%";
  productoHTML.style.float = "left";

  var nombre = document.createElement("h3");
  nombre.textContent = producto.nombre;
  productoHTML.appendChild(nombre);
  
  var imagen = document.createElement("img");
  imagen.src = producto.imagen;
  productoHTML.appendChild(imagen);    
  
  var precio = document.createElement("p");
  precio.textContent = "Precio: " + producto.precio;
  productoHTML.appendChild(precio);

  contenedorProductos.appendChild(productoHTML);
});
}
