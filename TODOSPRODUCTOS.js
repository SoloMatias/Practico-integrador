var productos = [];

// Array con las URLs de los archivos JSON a cargar
var urls = ['datos-productos-quimicos.json', 'datos-higiene-personal.json', 'datos-productos-limpieza.json'];

// Función para cargar un archivo JSON utilizando fetch y devolver la promesa resultante
function cargarDatos(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Agregar los productos del archivo JSON al arreglo 'productos'
      return data; // Retornar los datos para ser pasados a la siguiente etapa de la cadena
    })
    .catch(error => {
      console.error('Error al cargar los datos de productos', error);
    });
}

// Cargar los datos de todos los archivos JSON utilizando Promise.all()
Promise.all(urls.map(cargarDatos))
  .then(data => {
    // Concatenar los datos de todos los archivos en un solo arreglo
    productos = data.flat();
    
    // Aquí se ejecuta una vez que todas las promesas se han resuelto correctamente
    console.log('Carga de datos completada');
    mostrarProductos(productos);
    // Continuar con el resto del código
  })
  .catch(error => {
    // Aquí se maneja cualquier error ocurrido durante la carga de datos
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
 
