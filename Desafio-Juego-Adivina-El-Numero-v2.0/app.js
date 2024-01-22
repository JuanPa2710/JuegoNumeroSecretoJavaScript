let numSecreto = 0;
let intentos = 0;
let listaNumerosGenerados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let etiqueta = document.querySelector(elemento);
    etiqueta.innerHTML = texto;
    return;
}

function verificarIntento() {
    if(intentos > 3) {
        asignarTextoElemento('p', `Ha perdido, ha llegado al número máximo de intentos. Intentos utilizados: ${intentos-1} `);
    }
    else {    
        let numUsuario = parseInt(document.getElementById('valorUsuario').value);

        if(numUsuario === numSecreto) {
            asignarTextoElemento('p', `¡Acertaste el número! Usaste ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'} `);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        else {
            //El usuario no acertó 
            if(numUsuario > numSecreto) {
                asignarTextoElemento('p', 'El numero secreto es menor');
            }
            else {
                asignarTextoElemento('p', 'El numero secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    }

    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = "";
}

function generarNumeroSecreto() {    
    let numGenerado = Math.floor(Math.random()*numeroMaximo)+1;  

    console.log(numGenerado);
    console.log(listaNumerosGenerados);

    //Si ya sorteamos todos los numeros
    if(listaNumerosGenerados.length == numeroMaximo) {
        location.reload();            
    } else {
        //Si el número generado está en la lista
        if(listaNumerosGenerados.includes(numGenerado)) {
            return  generarNumeroSecreto();
        }
        else {
            listaNumerosGenerados.push(numGenerado);
            return numGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);  
    numSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar la caja
    limpiarCaja();

    //Indicar mensaje de intervalos de números  
    condicionesIniciales();

    //Deshabilitar el botón de nuevo juego  
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();

