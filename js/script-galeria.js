//Imagenes de la galeria
const obras = [
    { nombre: "Path", año: 2001, imagen: "img/obra1.png" },
    { nombre: "Path", año: 2001, imagen: "img/obra2.png" },
    { nombre: "Path", año: 2001, imagen: "img/obra3.png" },
    { nombre: "Path", año: 2001, imagen: "img/obra4.png" },
    { nombre: "Path", año: 2001, imagen: "img/obra5.png" }
];
//Seleccion de elementos del DOM (Contenedor de la galeria y el boton de diseño)
const contenedorGaleria = document.querySelector('#galeria');
const boton = document.querySelector('#boton');

//Contenedor y texto de las imagenes
function generarGaleria() {
    let contenido = "";
    for (let i = 0; i < obras.length; i++) {
        contenido += `
            <article class="tarjeta-obra">
                <img src="${obras[i].imagen}" alt="${obras[i].nombre}" class="imagen-obra">
                <h4>${obras[i].nombre}</h4>
                <p>Año: ${obras[i].año}</p>
            </article>
        `;
    }
    // Inserta todo el código HTML generado dentro del contenedor en la página web
    contenedorGaleria.innerHTML = contenido;

    let imagenes = document.querySelectorAll('.imagen-obra');
    //Zoom cuando el mouse hace click
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('click', function() {
            this.classList.toggle('zoom-activo');
        });
    }
}
//Funcionamiento del boton
if (boton) {
    //Cuando se apreta el boton se cambia el color del contenedor
    boton.addEventListener('click', function() {
        let tarjetas = document.querySelectorAll('.tarjeta-obra');
        
        for (let i = 0; i < tarjetas.length; i++) {
            if (tarjetas[i].style.backgroundColor === "rgb(51, 51, 51)") {
                tarjetas[i].style.backgroundColor = "#eee";
                tarjetas[i].style.color = "black";
            } else {
                tarjetas[i].style.backgroundColor = "#333";
                tarjetas[i].style.color = "white";
            }
        }
    });
}

generarGaleria();