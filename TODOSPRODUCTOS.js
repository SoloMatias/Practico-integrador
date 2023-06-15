var productos = [];

// Array con las URLs de los archivos JSON a cargar
var urls = ['datos-productos-quimicos.json', 'datos-higiene-personal.json', 'datos-productos-limpieza.json'];

var actual = window.location.pathname;

switch (actual) {
  case "/productos.html":
    urls = ['datos-productos-quimicos.json', 'datos-higiene-personal.json', 'datos-productos-limpieza.json'];
    break;
  case "/productos-higiene-Personal.html":
    urls = ['datos-higiene-personal.json'];
    break
  case "/productos-quimicos.html":
    urls = ['datos-productos-quimicos.json'];
    break
  case "/productos-limpieza-y-desinfectantes.html":
    urls = ['datos-productos-limpieza.json'];
    break
  default:
    urls = []
    break;
}

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
  productos.forEach(function (producto) {
    var productoHTML = document.createElement("div");
    productoHTML.classList.add("contendorProd");

    var nombre = document.createElement("h3");
    nombre.classList.add("prodTitle");
    nombre.textContent = producto.nombre;
    productoHTML.appendChild(nombre);

    var imgAndDescHTML = document.createElement("div");
    imgAndDescHTML.classList.add("contendorImgAndDescrip");

    var imagen = document.createElement("img");
    imagen.classList.add("productImage");
    imagen.src = producto.imagen;
    imgAndDescHTML.appendChild(imagen);

    var DescHTML = document.createElement("div");
    DescHTML.classList.add("contendorDescrip");

    var descTitle = document.createElement("h3");
    descTitle.classList.add("descTitle");
    descTitle.textContent = producto.descripcion?.title;
    DescHTML.appendChild(descTitle);

    var DescContent = document.createElement("p");
    DescContent.classList.add("descContent");
    DescContent.textContent = producto.descripcion?.content;
    DescHTML.appendChild(DescContent);
    imgAndDescHTML.appendChild(DescHTML);
    productoHTML.appendChild(imgAndDescHTML);
    var precio = document.createElement("p");
    precio.classList.add("productPriceTitle");
    precio.textContent = "Precio ";
    productoHTML.appendChild(precio);

    if (producto.precios) {
      producto.precios.forEach(precio => {
        console.log(precio);
        var pcio = document.createElement("p");
        pcio.classList.add("productPrice");
        pcio.textContent =
          //precio.unidad + ": "+
          (precio.valorMenor ? ("Menor " + precio.moneda + " " + precio.valorMenor) : "") +

          (precio.valorMayor ? " Mayor " + precio.moneda + " " + precio.valorMayor : "");
        productoHTML.appendChild(pcio);
      })
    }
    console.log(productoHTML);
    contenedorProductos.appendChild(productoHTML);
  });
}

