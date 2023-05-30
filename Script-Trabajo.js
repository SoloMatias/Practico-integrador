fetch('https://github.com/SoloMatias/Practico-integrador/blob/main/datos-productos.json')
  .then(response => response.json())
  .then(data => {
    // Aquí tienes acceso a tus datos de productos
    mostrarProductos(data);

    // Resto del código del filtro
    // ...
  })
  .catch(error => {
    console.error('Error al cargar los datos de productos', error);
  });
    
  // Función para mostrar los productos en el contenedor
  function mostrarProductos(categoria) {
    var contenedorProductos = document.getElementById("contenedor-productos");
  
    // Limpiar el contenedor de productos
    contenedorProductos.innerHTML = "";
  
    // Filtrar los productos según la categoría seleccionada
    var productosFiltrados = (categoria === "todos") ? productos : productos.filter(function(producto) {
      return producto.categoria === categoria;
    });
  
    // Mostrar los productos en el contenedor
    productosFiltrados.forEach(function(producto) {
      var productoHTML = document.createElement("div");
      productoHTML.textContent = producto.nombre;
      contenedorProductos.appendChild(productoHTML);
    });
  }
  
  // Evento para actualizar los productos al hacer clic en una categoría
  var listaCategorias = document.getElementById("lista-categorias");
  listaCategorias.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
      var categoriaSeleccionada = event.target.getAttribute("data-categoria");
  
      // Aplicar estilos activos al elemento seleccionado
      var categorias = listaCategorias.getElementsByTagName("li");
      for (var i = 0; i < categorias.length; i++) {
        categorias[i].classList.remove("categoria-activo");
      }
      event.target.classList.add("categoria-activo");
  
      // Mostrar los productos correspondientes a la categoría seleccionada
      mostrarProductos(categoriaSeleccionada);
    }
  });
  
  // Mostrar todos los productos al cargar la página
  mostrarProductos("todos");
  
  
