var productos = [];
var productosSeleccionados=[];
var productoSelect;
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
  .then(allData => {
    // Concatenar los datos de todos los archivos en un solo arreglo
    productos = allData.flat();

    // Aquí se ejecuta una vez que todas las promesas se han resuelto correctamente
    console.log('Carga de datos completada');
    let innerHTML="<option selected>seleccione un producto</option>";
    let select=document.getElementById("select-produ");
    
    productos.forEach((producto, index) => {
        innerHTML=innerHTML+'<option value="'+producto.nombre+'">'+producto.nombre+'</option>'
    });
    console.log(innerHTML);
    select.innerHTML=innerHTML;
    select.addEventListener("change", (ev)=>{
        console.log(ev.target.value);
        productos.forEach(producto=> {
            if(ev.target.value==producto.nombre){
                productoSelect=producto;
                let inputCant=document.getElementById("inputCant");
                let button= document.getElementById("button");
                inputCant.addEventListener("input", (ev)=>{
                    if(ev.target.value){
                    productoSelect["cantidad"]=ev.target.value;
                    button.disabled = false;}else{ inputCant.value = null; button.disabled = true};
                })
                inputCant.disabled=false;
                let unidad=document.getElementById("addon-wrapping");
                console.log(unidad);
                unidad.textContent=producto.unidad;
                
                button.addEventListener("click",(ev)=>{
                    let listadoElement = document.getElementById("listadoProd");
                    listadoElement.value = listadoElement.value + productoSelect.nombre + " (" + productoSelect.cantidad + productoSelect.unidad + ") / "; 
                    productosSeleccionados.push(productoSelect);
                    select.innerHTML = innerHTML;
                    inputCant.value = null;
                    button.disabled = true;
                    inputCant.disabled = true;
                    productoSelect = null;
                });
            }

        });
    })

    
    // Continuar con el resto del código
  })
  .catch(error => {
    // Aquí se maneja cualquier error ocurrido durante la carga de datos
    console.error('Error al cargar los datos de productos', error);
  });
