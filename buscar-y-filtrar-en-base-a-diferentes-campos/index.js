//Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear();

const min = max-10;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


//Eventos
document.addEventListener('DOMContentLoaded', () => {
    
    mostrarAutos(autos);

    llenarSelect();
})

//Event Listener para seleccionar y segun eso gestionar la busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto()
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    
    filtrarAuto()
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    
    filtrarAuto()
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    
    filtrarAuto()
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    
    filtrarAuto()
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto()
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    
    filtrarAuto()
})


//funciones
function mostrarAutos(autos) {

    limpiarHTML()//elimina el HTML previo

    autos.forEach( auto => {
        
        const {marca, modelo, year, precio, puertas, transmision, color} = auto

        const autoHTML =  document.createElement('p');

        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${precio}- ${puertas} - ${transmision} - ${color}
        `;
        
        resultado.appendChild(autoHTML)
    });
    
}
//Limpiar HTML
function limpiarHTML(){
    while( resultado.firstChild ){ //mientras haya algo
        resultado.removeChild(resultado.firstChild )
    }
}


function llenarSelect(){
    for(let i=max;  i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)
    }
}

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter(filtrarPuertas).filter(filtrarTransm).filter( filtrarColor )
    
    if (resultado.length) {
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noresultado = document.createElement('div');
    noresultado.classList.add('alerta', 'error');
    noresultado.textContent = 'No hay resultado para un auto con esas caracteristicas'
    resultado.appendChild(noresultado)
}


function filtrarMarca(auto){
    if( datosBusqueda.marca ){
        return auto.marca == datosBusqueda.marca
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}
function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if ( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if ( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTransm(auto){

    if(datosBusqueda.transmision){
        return datosBusqueda.transmision == auto.transmision
    }
    return auto;
}
function filtrarColor(auto){
    if(datosBusqueda.color){
        return datosBusqueda.color == auto.color;
    }
    return auto;
}













