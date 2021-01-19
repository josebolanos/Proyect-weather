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

    // Muestra un spinner de carga
    Spinner();
    // Accedemos al archivo json para visualizarlo
    fetch(url)
        .then( respuesta => respuesta.json() )
        //Añadimos un if para que en casa que no encuentre la ciudad nos de una mensaje de aviso datos.cod 404 es el codigo de error interno
        .then( datos => {
            // Esta funcion es para limpiar la informacion anterior
            limpiarHTML();
            // Tener en cuenta se pone "404" asi por que es String
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }

            // Visualizar la respuesta en el HTML
            mostrarClima(datos);
        })
        
}


function mostrarClima(datos) {
    // He accedido a la informacion que nos interesa dentro de API
    console.log(datos);
    const { name, weather:[{description, icon}],main: {temp, temp_max, temp_min } } = datos;
    console.log(icon);
    
    


    // Con esto hemos pasar grados kelvin a centigrados
    const temperatura = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    // He creado un DIV Y UN P  e introducido los datos en el HTML
    

    


    const climaCiudad = document.createElement('p');
    climaCiudad.textContent = `${description}`;
    climaCiudad.classList.add('font-bold', 'text-4xl', 'text-white', 'text-center');


    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `${name}`;
    nombreCiudad.classList.add('font-bold', 'text-6xl', 'text-white', 'text-center');

    const actual = document.createElement('p');
    actual.innerHTML = `${temperatura} &#8451;`;
    actual.classList.add('font-bold', 'text-5xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl', 'text-center', 'text-white');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-l', 'text-center','text-white');
   
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    // Introducimos los resultados en el HTML
    resultado.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultado.appendChild(resultadoDiv);
    resultado.appendChild(tempMaxima);
    resultado.appendChild(tempMinima);
    resultado.appendChild(climaCiudad);
   



    
}

// Crearcion de nueva funcion para pasar Kelvin a Centigrados y redondear con parseInt
const kelvinACentigrados = grados => parseInt(grados - 273.15);


// He creado una funcion para limpiar siempre el resultado anterior del HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
// Crarmos una funcion para el Spinner de carga
function Spinner() {
    // Limpiar el html
    limpiarHTML();
    // Creamos un div donde contendra el spinner 
    const divSpinner = document.createElement('div');
    // Clase del spinner en css
    divSpinner.classList.add('sk-fading-circle');
    // Informacion del spinner sacada de SpinKit
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    // Lo añadimos al HTML
    resultado.appendChild(divSpinner);
}


