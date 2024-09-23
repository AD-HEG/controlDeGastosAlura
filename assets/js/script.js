let listaNombresGastos = [];
let listaValoresGastos = [];
let listaConceptosGastos = [];
let indexEdicion = -1; // Variable global para controlar si estamos editando

function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let conceptoGasto = document.getElementById('conceptoGasto').value;
    
    if(valorGasto > 149){
        alert('El gasto es mayor a $ 150.00 ');
    }

    // Si estamos editando, actualizamos el valor en el array
    if (indexEdicion >= 0) {
        listaNombresGastos[indexEdicion] = nombreGasto;
        listaValoresGastos[indexEdicion] = valorGasto;
        listaConceptosGastos[indexEdicion] = conceptoGasto;
        indexEdicion = -1; // Reiniciar para futuras entradas nuevas
    } else {
        // Si no estamos editando, añadimos un nuevo gasto
        listaNombresGastos.push(nombreGasto); 
        listaValoresGastos.push(valorGasto);
        listaConceptosGastos.push(conceptoGasto);
    }
   
    actualizarListaDeGastos();
}

function actualizarListaDeGastos(){
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const conceptoGasto = listaConceptosGastos[posicion];
        htmlLista += `<li>
                        <span class="nombre"><b>Nombre:</b> ${elemento}</span>
                        <span class="concepto"><b>Concepto:</b> ${conceptoGasto}</span>
                        <span class="valor"><b>Valor:</b> USD ${valorGasto.toFixed(2)}</span>
                        
                        <button onclick="editarGasto(${posicion});" class="icon-button">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="eliminar icon-button" onclick="eliminarGasto(${posicion});">
                            <i class="fas fa-trash"></i>
                        </button>
                      </li>`;
        totalGastos += valorGasto;
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}


function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('conceptoGasto').value = '';
    indexEdicion = -1; // Reiniciar el índice de edición después de limpiar
}

function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaConceptosGastos.splice(posicion, 1);
    actualizarListaDeGastos();
}

function editarGasto(posicion){
    // Cargar los valores del gasto en los inputs
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('conceptoGasto').value = listaConceptosGastos[posicion];

    // Establecer el índice para indicar que estamos editando
    indexEdicion = posicion;
}
