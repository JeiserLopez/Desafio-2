//Variables
let palabras = ["VACA", "CAMISA", "ALURA", "ORACLE","DESAFIO","JAVASCRIPT","HTML","PROGRAMACION","DESARROLLO","CANVAS"];
let palabraSeleccionada;
var hombre, l;
var tamanio;
var arregloIncorrectas = new Array;
var palabraSorteada = false;
var canvas;
var contexto;


var Ahorcado = function (con)
{
    this.sitio = con;
    this.maximoIntentos = 5;
    this.intentosRealizados = 0;
    this.vivo = true;
    this.dibujar();
}


Ahorcado.prototype.dibujar = function ()
{
    var muñeco = this.sitio;

    //Dibujando el poste
    muñeco.beginPath();
    muñeco.moveTo(150,100);
    muñeco.lineTo(150,50);
    muñeco.lineTo(400,50);
    muñeco.lineTo(400,350);
    muñeco.lineWidth = 15;
    muñeco.strokeStyle = "#000";
    muñeco.stroke();
    muñeco.closePath();

    if(this.intentosRealizados > 0)
    {
        // intentos = 1 Dibujar Cabeza
        muñeco.beginPath();
        muñeco.arc(150, 140, 40, 0, Math.PI * 2, false);
        muñeco.strokeStyle = "#F79A86";
        muñeco.lineWidth = 5;
        muñeco.stroke();
        muñeco.closePath();

        if(this.intentosRealizados > 1)
        {
            // intentos = 2 dibujar cuerpo
            muñeco.beginPath();
            muñeco.moveTo(150,180);
            muñeco.lineTo(150,250);
            muñeco.strokeStyle = "blue";
            muñeco.lineWidth = 5;
            muñeco.stroke();
            muñeco.closePath();

            if(this.intentosRealizados > 2)
            {
                // intentos = 3 dibujar brazos
                muñeco.beginPath();
                muñeco.moveTo(120,220);
                muñeco.lineTo(150,180);
                muñeco.lineTo(180,220);
                muñeco.strokeStyle = "blue";
                muñeco.lineWidth = 5;
                muñeco.stroke();
                muñeco.closePath();

                if(this.intentosRealizados > 3)
                {
                    // intentos = 4 dibujar piernas
                    muñeco.beginPath();
                    muñeco.moveTo(120,290);
                    muñeco.lineTo(150,250);
                    muñeco.lineTo(180,290);
                    muñeco.strokeStyle = "green";
                    muñeco.lineWidth = 5;
                    muñeco.stroke();
                    muñeco.closePath();

                    if(this.intentosRealizados > 4)
                    {
                        // intentos = 5  ojos muertos "X"
                        muñeco.beginPath();
                        //Ojo izquierdo
                        muñeco.moveTo(125,120);
                        muñeco.lineTo(145,145);
                        muñeco.moveTo(145,120);
                        muñeco.lineTo(125,145);

                        //Ojo derecho
                        muñeco.moveTo(155,120);
                        muñeco.lineTo(175,145);
                        muñeco.moveTo(175,120);
                        muñeco.lineTo(155,145);

                        muñeco.strokeStyle = "red";
                        muñeco.lineWidth = 5;
                        muñeco.stroke();
                        muñeco.closePath();
                    }
                }
            }

        }

    }
}

Ahorcado.prototype.trazar = function ()
{
    this.intentosRealizados++;
    var centerX = canvas.width/2;
    if(this.intentosRealizados >= this.maximoIntentos)
    {
        this.vivo = false;
        contexto.textAlign="center";					
        contexto.font="20pt Verdana";
        contexto.fillStyle = "Red";
        contexto.fillText("Fin del juego!!",550,200);

    }
    this.dibujar();
}

function sortearPalabra()
{
    palabraSeleccionada = palabras[Math.round(Math.random()*10)];
    palabraSorteada = true;
    palabra.innerText = "";
    palabraInco.innerText = "";
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");
    canvas.setAttribute("width", "800");
    canvas.setAttribute("height", "800");
    limpiarCanvas();
}

function limpiarCanvas(){
    contexto.clearRect(0,0,canvas.width, canvas.height);
}

function comenzarJuego(){
    arregloIncorrectas=[];
   // limpiarCanvas();
    palabraInco.innerText = "";
    if(palabraSorteada){
        let arregloPalabra = palabraSeleccionada.split('');
        hombre = new Ahorcado(contexto);
        tamanio = new Array(arregloPalabra.length);
        mostrarTamanioPalabra(tamanio);
        document.onkeyup = agregarLetra;
    }
    else{
        alert("Debe sortear la palabra a adivinar");
    }
}



function mostrarTamanioPalabra(tamanio)
{
    var palabra = document.getElementById("palabra");
    var texto = "";
    var i;
    var largo = tamanio.length;

    for(i = 0; i<largo; i++)
    {
        if(tamanio[i] != undefined)
        {
            texto = texto + tamanio[i] + " ";
        }
        else
        {
            texto += "___ ";
        }
    }
    palabra.innerText = texto;

}

function mostrarIncorrectas(arregloIncorrectas)
{
    if(arregloIncorrectas.length > 0){
        var palabraMuerto = document.getElementById("palabraInco");
        palabraMuerto.innerText = "Letras Incorrectas:" + arregloIncorrectas;
    }
}


function agregarLetra()
{ 
    if(event.keyCode>64 && event.keyCode<91){
        var letra = String.fromCharCode(event.keyCode);
        mostrarPalabra(palabraSeleccionada, hombre, letra.toUpperCase());
    }
}

function mostrarPalabra(palabra, ahorcado, letra)
{
    var encontrado = false;
    var p;
    
    letra = letra.toUpperCase();
    for (p in palabra)
    {
        console.log(letra == palabra[p]);
        if (letra == palabra[p])
        {
            tamanio[p] = letra;
            encontrado = true;
        }
        
    }

    if(!encontrado){
        
        if(!(arregloIncorrectas.includes(letra)))
        {
            arregloIncorrectas.push(letra);
        }
        else{
            encontrado = true;
        }
    }
    console.log(arregloIncorrectas);
    
   
    mostrarTamanioPalabra(tamanio);
    mostrarIncorrectas(arregloIncorrectas);

    // Si NO lo encontré
    if(!encontrado)
    {
        ahorcado.trazar();
    }

    if(!ahorcado.vivo)
    {
        var palabraMuerto = document.getElementById("palabra");
        palabraMuerto.innerText = "La Palabra Correcta es: " + palabraSeleccionada;
    }

    //Si lo encontre
    //alert(tamanio.toString().replace(/,/g,""));
    if(encontrado && tamanio.toString().replace(/,/g,"") == palabraSeleccionada)
    {
        contexto.textAlign="center";					
        contexto.font="20pt Verdana";
        contexto.fillStyle = "Red";
        contexto.fillText("Ganaste, Felicidades!!",600,200);
    }
}

// funciones para agregar nueva palabra al arreglo

var tecla;
var patron;
var tecla_final; 

function validarLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function agregarPalabra(){
    var encontrada = false;
    for(var i = 0; i <= palabras.length; i++)
    {
        if (palabras[i] == nuevaPalabra.value.toUpperCase())
        {
            encontrada = true;
        }
    }
    if (nuevaPalabra.value != ""){
        if (!encontrada)
        {
            palabras.push(nuevaPalabra.value.toUpperCase());
            nuevaPalabra.value = "";
            console.log(palabras);
        }
        if (encontrada)
        {
            alert("La palabra ya se encuentra en el arreglo");
            nuevaPalabra.value = "";
            console.log(palabras);
        }
    }
    else
    {
        alert("Debe Escribir al menos una letra");
    }
}



	