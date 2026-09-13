document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GALERÍA DE IMÁGENES Y DISEÑO
    // ==========================================
    // Array de objetos con la galería de imágenes
    const obras = [
        { nombre: "Microimage A-05", año: 2002, imagen: "img/obra1.png" },
        { nombre: "Phototaxis", año: 2021, imagen: "img/obra2.png" },
        { nombre: "SIMULACRUM (A-P-04)", año: 2025, imagen: "img/obra3.png" },
        { nombre: "Still Life (HSB E)", año: 2023, imagen: "img/obra4.png" },
        { nombre: "Atomism", año: 2012, imagen: "img/obra5.png" }
    ];

    // Se capturan los elementos de la galería y el botón de diseño
    const contenedorGaleria = document.querySelector('#galeria');
    const btnDiseño = document.querySelector('#boton'); 

    // Se genera la galería interactiva y se inyecta el HTML generado
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
        contenedorGaleria.innerHTML = contenido;

        // Se agrega la funcionalidad de zoom idéntica a la estructura permitida
        let imagenes = document.querySelectorAll('.imagen-obra');
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].addEventListener('click', function() {
                this.classList.toggle('zoom-activo');
            });
        }
    }

    if (btnDiseño) {
        btnDiseño.addEventListener('click', function() {
            // Se capturan todos los elementos generados
            let tarjetas = document.querySelectorAll('.tarjeta-obra');

            for (let i = 0; i < tarjetas.length; i++) {
                if (tarjetas[i].style.backgroundColor === "rgb(51, 51, 51)") {
                    tarjetas[i].style.backgroundColor = "";
                    tarjetas[i].style.color = "";
                } else {
                    tarjetas[i].style.backgroundColor = "#333";
                    tarjetas[i].style.color = "white";
                }
            }
            console.log("Se ha modificado el diseño de la página");
        });
    }

    // Ejecución inicial para que la galería aparezca al cargar la página
    generarGaleria();

    // ==========================================
    // 2. FORMULARIO DE GESTIÓN Y CÁLCULO
    // ==========================================
    // Se declaran las variables de control
    let listaInstalaciones = [];
    let totalInstalacionesCargar = 0;

    // Se capturan los elementos id del formulario
    const inputTotal = document.querySelector('#cant-instalaciones'); 
    const formulario = document.querySelector('#form-instalaciones');
    const btnCargar = document.querySelector('#btn-agregar');
    const btnCalcular = document.querySelector('#btn-calcular');
    const btnReiniciar = document.querySelector('#btn-reiniciar');
    const areaResultados = document.querySelector('#area-resultados');

    // Se carga el evento de carga
    if (btnCargar) {
        btnCargar.addEventListener('click', function() {
            if (listaInstalaciones.length === 0) {
                totalInstalacionesCargar = Number(inputTotal.value);
                if (isNaN(totalInstalacionesCargar) || totalInstalacionesCargar <= 0) {
                    alert("Ingrese una cantidad válida.");
                    return;
                }
                inputTotal.disabled = true;
            }

            const nombre = document.querySelector('#nombre').value;
            const personas = Number(document.querySelector('#personas').value);
            const dias = Number(document.querySelector('#dias').value);
            const horas = Number(document.querySelector('#horas-dia').value);
            const honorario = Number(document.querySelector('#honorario').value);

            if (nombre === "" || isNaN(personas) || personas < 0 || isNaN(dias) || dias < 0 || isNaN(horas) || horas < 0 || isNaN(honorario) || honorario < 0) {
                alert("Complete todos los campos correctamente.");
                return;
            }
            console.log("Se ha cargado una instalación");

            listaInstalaciones.push({ nombre, personas, dias, horas, honorario });
            alert("Instalación cargada. Quedan: " + (totalInstalacionesCargar - listaInstalaciones.length));
            formulario.reset();

            if (listaInstalaciones.length === totalInstalacionesCargar) {
                btnCargar.disabled = true;
                btnCalcular.disabled = false;
            }
        });
    }

    // Se escucha el evento "calcular" manteniendo la estructura estricta de bucles `for` del modelo
    if (btnCalcular) {
        btnCalcular.addEventListener('click', function() {
            let costoTotalEstudio = 0;
            let costoDiarioGlobalTotal = 0;
            
            // Se analiza el objeto inicializando con el primer elemento
            let instalacionMax = listaInstalaciones[0];

            for (let i = 0; i < listaInstalaciones.length; i++) {
                let itemActual = listaInstalaciones[i];
                
                // Se calcula el costo diario de la instalación y se acumula el global
                let costoDiarioInstalacion = itemActual.personas * itemActual.horas * itemActual.honorario;
                costoDiarioGlobalTotal += costoDiarioInstalacion;

                // Se busca el máximo de días
                if (itemActual.dias > instalacionMax.dias) {
                    instalacionMax = itemActual; 
                }
            }

            // Se calcula el costo total de todas las instalaciones sumando sus costos individuales (diario * días)
            for (let i = 0; i < listaInstalaciones.length; i++) {
                let itemActual = listaInstalaciones[i];
                let costoDiarioInstalacion = itemActual.personas * itemActual.horas * itemActual.honorario;
                costoTotalEstudio += (costoDiarioInstalacion * itemActual.dias);
            }

            // Se calcula el costo usando el objeto encontrado como máximo de días
            let costoDiarioMax = instalacionMax.personas * instalacionMax.horas * instalacionMax.honorario;
            let costoTotalMasDias = costoDiarioMax * instalacionMax.dias;

            // Porcentaje que representa respecto al costo total del estudio
            let porcentaje = costoTotalEstudio > 0 ? (costoTotalMasDias / costoTotalEstudio) * 100 : 0;

            areaResultados.innerHTML = `
                <div class="resultados">
                    <p>1. Costo total de un día de trabajo (todo el personal): $${costoDiarioGlobalTotal.toFixed(2)}</p>
                    <p>2. Instalación con más días: ${instalacionMax.nombre} (${instalacionMax.dias} días). Costo Total: $${costoTotalMasDias.toFixed(2)}.</p>
                    <p>3. Porcentaje del costo total del estudio: ${porcentaje.toFixed(2)}%.</p>
                </div>
            `;

            btnCalcular.disabled = true;
            btnReiniciar.disabled = false;
            console.log("Se han calculado las producciones");
        });
    }

    // Se escucha el evento reiniciar respetando el modelo base
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', function() {
            listaInstalaciones = []; 
            totalInstalacionesCargar = 0;

            // Se limpia el área de resultados
            areaResultados.innerHTML = ""; 

            inputTotal.value = ""; 
            inputTotal.disabled = false;

            // Se limpian los campos del formulario
            formulario.reset(); 

            // Se restablece el estado de los botones
            btnCargar.disabled = false;
            btnCalcular.disabled = true;
            btnReiniciar.disabled = true;

            console.log("Sistema reiniciado correctamente");
        });
    }
});