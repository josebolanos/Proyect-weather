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
