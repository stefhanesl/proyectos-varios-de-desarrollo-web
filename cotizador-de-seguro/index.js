//constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function(){
    /*
        1. Americano incrementa el valor en 1.15
        2. Asiatico incrementa en 1.05
        3. Europeo incrementa en 1.35
    */
   let cantidad;
   const base = 2000;
   switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
   }

   //leer el anio
   const diferencia = new Date().getFullYear() - this.year;
   //cada anio que la diferencia es mayor, el costo va a reducirse 
   cantidad -= ((diferencia * 3) * cantidad)/ 100;

   /**
    * Si el seguro es basico se multiplica por un 30% mas
    * Si el seguro es completo se multiplica por un 50% mas
    */

   if (this.tipo == 'basico') {
    cantidad *= 1.3;
   }else{
    cantidad *= 1.5;
   }

   return cantidad;

}

//-------------------------------------------

function UI(){

}
//lena las opcionesd elos anios
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max-20;
    const selectYear = document.querySelector('#year')
    
    for(let i=max; i > min; i--){
        let option = document.createElement('option')
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }
}
//Muestra alertas en pantalla
UI.prototype.mostrarMensaje =  (mensaje, tipo) => {
    const div =  document.createElement('div')

    if( tipo == 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario =  document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}
UI.prototype.mostrarResultado = (total, seguro) => {
    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `
        <p class='header'> Tu Resumen </p>
        <p class='font-bold'> Total: ${total} </p>
    `;

    const resultadoDiv = document.querySelector('#resultado')
    

    //mostrar spinner
    const spinner =  document.querySelector('#cargando')
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000)
}
//instanciar UI
const ui =  new UI()

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones() //llena el select con los anios
})

eventListener()

function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault()

    //leer marcar
    const marca  = document.querySelector('#marca').value

    //leer anio
    const year  = document.querySelector('#year').value

    // leer cobertura
    const tipo  = document.querySelector('input[name="tipo"]:checked').value

    if (marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }else{
        ui.mostrarMensaje('Cotizando...', 'exito');
    }
    //oculta las cotizaciones previas
    const resultados = document.querySelector('#resultado div')
    if ( resultados != null ) {
        resultados.remove()
    }


    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

   
    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro)
}
