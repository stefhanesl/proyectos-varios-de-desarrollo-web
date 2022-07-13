//variables
const formulario = document.querySelector('#agregar-gasto')
const listaGastos =  document.querySelector('#gastos ul')

//event listener
eventlistener()
function eventlistener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto )
    formulario.addEventListener('submit', validarDatos)
}


//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = []
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()

    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cant, 0)
        this.restante = this.presupuesto - gastado
        
    }
    eliminarPorGasto(identificador){
        this.gastos = this.gastos.filter( gasto => gasto.id != identificador )
        this.calcularRestante();
    }
}

class UI{

    insertarPresupuesto( cantidad ){
        
        const { presupuesto, restante } = cantidad;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    mostrarMensaje(mensaje, tipo){
        const contenido = document.querySelector('.primario')
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert')

        if ( tipo === 'error' ) {
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }
        divMensaje.textContent = mensaje;
        contenido.insertBefore(divMensaje, formulario )

        setTimeout(() => {
            divMensaje.remove()
        }, 3000)
    }

    listadoProductos(gastos){
        this.limpiarHTML()

        gastos.forEach( gasto => {
            const { nombre, cant, id } = gasto
            
            const li = document.createElement('li')
            li.className = 'list-group-item d-flex justify-content-between align-items-center'
            li.dataset.id = id

            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnEliminar.textContent = 'Eliminar'

            btnEliminar.onclick = () => {
                eliminarGasto(id)
            }

            li.innerHTML = `
                ${nombre} <span class='badge badge-primary badge-pill'>$ ${cant}</span> 
            `
            li.appendChild(btnEliminar)
            listaGastos.appendChild(li)
            
        })
    }


    limpiarHTML(){
        while (listaGastos.firstChild) {
            listaGastos.removeChild(listaGastos.firstChild)
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

}




//instancia
let presupuesto;
let ui = new UI()



//funciones
function preguntarPresupuesto(e){
    e.preventDefault()
    const presupuestoUsu = prompt('Cual es su presupuesto?')

    if ( presupuestoUsu <= 0 || presupuestoUsu == null || presupuestoUsu === '' || isNaN(presupuestoUsu)){
        window.location.reload()
    }

    
    presupuesto = new Presupuesto(presupuestoUsu);

    ui.insertarPresupuesto(presupuesto)
    

}

function validarDatos(e){
    e.preventDefault()
    const nombre = document.querySelector('#gasto').value
    const cant = Number(document.querySelector('#cantidad').value)

    if ( nombre === '' || cant === ''){
        ui.mostrarMensaje('Es obligatorio ingresar todos los campos', 'error')

        return;
    }else if ( isNaN(cant) || cant <= 0) {
        ui.mostrarMensaje('Es necesario que ingrese un numero valido en gastos', 'error')

        return;
    }else{
        ui.mostrarMensaje('Datos ingresados exitosamente')
    }
    const gasto = {
        nombre,
        cant,
        id: Date.now()
    }

    presupuesto.nuevoGasto(gasto)
    
    const { gastos, restante } = presupuesto;

    ui.listadoProductos(gastos)
    
    ui.actualizarRestante(restante)

    formulario.reset()


}
function eliminarGasto(id){

    presupuesto.eliminarPorGasto(id);

    const { gastos, restante } = presupuesto

    ui.listadoProductos(gastos)

    ui.actualizarRestante(restante)
}
