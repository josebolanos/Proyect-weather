const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault();

   

    //Validar
    const ciudad= document.querySelector('#ciudad').value;
    const pais= document.querySelector('#pais').value;

    if(ciudad === '' || pais === '' ) {
        //Mensaje hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    // Consultariamos la API
    consultarAPI(ciudad, pais);
}

// Funcion de error
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-opacity-30');
    // Estamos haciendo que no se repita  la alerta
    if(!alerta) {
                // Creamos un div
            const alerta = document.createElement('div');
            // Le damos forma al div de error
            alerta.classList.add('bg-opacity-30', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
            // Introducimos la alerta en el HTML
            alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
            `;
            // Unimos el mensaje de alerta debajo del container
            container.appendChild(alerta);

            // Eliminar la alerta despues de 5s
            setTimeout(() => {
                alerta.remove();
            }, 5000) ;

        }
  
}
// Funcion para acceder a la API del tiempo
function consultarAPI(ciudad, pais) {
    // Aqui colocamos id que nos da la web dela API
    const appID = '0f79eb01f89877b6be1f6d3a8133183d'
    // Aqui ponemos el url que nos da la web de la API y le añadimos http para que detecte que proviene de una web y no un archivo interno
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    // Accedemos al archivo json para visualizarlo
    fetch(url)
        .then( respuesta => respuesta.json() )
        //Añadimos un if para que en casa que no encuentre la ciudad nos de una mensaje de aviso datos.cod 404 es el codigo de error interno
        .then( datos => {
            // Tener en cuenta se pone "404" asi por que es String
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
            }
        })

    console.log(url);

}
