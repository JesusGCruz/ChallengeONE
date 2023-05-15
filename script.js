let texto = document.getElementById("mensaje");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const btnBorrar = document.getElementById("borrar");
const btnLimpiar = document.getElementById("Limpiador");
const btnsResult = document.querySelectorAll(".resultados");

//Ocultara/Mostrara el parrafo (p)
const p = document.getElementById("conteinerParrafo");
function ocultarParrafo(){
    p.classList.add("ocultar");
}
function mostrarParrafo(){
    p.classList.remove("ocultar");
}

//Convierte lo que esté en el txtArea en minusculas.
//let box = document.querySelector("label");
texto.addEventListener("input", () => {
    let inputText = texto.value;
    inputText = inputText.toLowerCase();
    texto.value = inputText;
    //box.innerText = texto.value;
});
//Redimencionar caja texto.
texto.addEventListener('input', () => {
    texto.style.height = 'auto';
    texto.style.height = `${texto.scrollHeight}px`;
});

texto.focus();
//Variables para el encriptador/desencriptador
let textoEncrip = [];
let mensaje = "";
let palabra1 = "";
let cancelador = -1;
//Variable para detectar mas de dos encriptaciones seguidas
let compEncrip = 0;

function encriptar(texto){
    
    for(const letras of texto){
            if(letras == "a"){
                textoEncrip.push("ai");
            }else if(letras == "e"){
                textoEncrip.push("enter");
            }else if(letras == "i"){
                textoEncrip.push("imes");
            }else if(letras == "o"){
                textoEncrip.push("ober");
            }else if(letras == "u"){
                textoEncrip.push("ufat");
            }else{
                textoEncrip.push(letras);
            }
        }
        for(let i = 0; i < textoEncrip.length; i++){
            palabra1 = textoEncrip[i];
            mensaje = mensaje.concat(palabra1);
        }
        return mensaje;
    }

    function desencriptar(texto){
        for(let i = 0; i < texto.length; i++){
            if(texto[i] == "a" && texto[i+1] == "i"){
                textoEncrip.push("a");
                cancelador = i+1;
            }else if(texto[i] == "e" && texto[i+1] == "n" && texto[i+2] == "t" && texto[i+3] == "e" && texto[i+4] == "r"){
                textoEncrip.push("e");
                cancelador = i+4;
            }else if(texto[i] == "i" && texto[i+1] == "m" && texto[i+2] == "e" && texto[i+3] == "s"){
                textoEncrip.push("i");
                cancelador = i+3;
            }else if(texto[i] == "o" && texto[i+1] == "b" && texto[i+2] == "e" && texto[i+3] == "r"){
                textoEncrip.push("o");
                cancelador = i+3
            }else if(texto[i] == "u" && texto[i+1] == "f" && texto[i+2] == "a" && texto[i+3] == "t"){
                textoEncrip.push("u");
                cancelador = i+3;
            }else if(cancelador < i){
                textoEncrip.push(texto[i]);
            }
        }
        for(let i = 0; i < textoEncrip.length; i++){
            palabra1 = textoEncrip[i];
            mensaje = mensaje.concat(palabra1);
        }
        return mensaje;
}

function limpiarVariables(){
    mensaje = "";
    palabra1 = "";
    cancelador = -1;
    let longitud = textoEncrip.length;
    for(let i = 0; i < longitud; i++){
        textoEncrip.pop();
    }
}

function eventoEncrip(){
    if(texto.value == "" | compEncrip > 0){
    }else{
        limpiarVariables();
        ocultarParrafo();
        btnsResult[nButton].classList.remove('ocultar');
        let mensajeEncrip = encriptar(texto.value);
        btnsResult[nButton].innerText = mensajeEncrip;
        texto.value = mensajeEncrip;
        compEncrip++;
    }
    texto.focus();
}
function eventoDesencrip(){
    if(texto.value == ""){
    }else{
        limpiarVariables();
        ocultarParrafo();
        btnsResult[nButton].classList.remove('ocultar');
        let mensajeEncrip = desencriptar(texto.value)
        btnsResult[nButton].innerText = mensajeEncrip;
        texto.value = mensajeEncrip;
    }
    compEncrip = 0;
    texto.focus();
}
function eventoBorrar(){
    texto.focus();
    if(texto.value == ""){
    }else{
        texto.value = "";
        limpiarVariables();
        sigBoton();
    }
    compEncrip = 0;
}

let nButton = 0; //numero de boton
function sigBoton(){
    if(nButton > 3){
        nButton = 0;
    }else{
        nButton++;
    }
}

function eventoLimpiar(){
    for(const button of btnsResult){
        button.innerText = "";
        button.classList.add('ocultar');
    }
    nButton = 0;
    mostrarParrafo();
    texto.focus();
}

//Cuando se le de click al boton se copiara el texto del mismo
for(const button of btnsResult){
    button.onclick = copiador;
}
function copiador(){
    navigator.clipboard.writeText(this.innerText);
    texto.focus();
}

//Ocultar los botones de copiado
for(const button of btnsResult){
    button.classList.add('ocultar');
}

btnEncriptar.onclick = eventoEncrip;
btnDesencriptar.onclick = eventoDesencrip;
btnBorrar.onclick = eventoBorrar;
btnLimpiar.onclick = eventoLimpiar;