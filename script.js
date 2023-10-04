const textArea = document.querySelector(".text-area");
const message = document.querySelector(".message");
const copy = document.querySelector(".copy");
const notFound = document.querySelector(".not-found");
const textZone = document.querySelector(".text");

copy.style.display = "none";

function textValidator(){
    const regex = /^[^\u00E0-\u00FC]+$/;
    let writtenText = document.querySelector(".text-area").value;

    if(writtenText.length === 0){
        alert("El texto NO puede estar vacío");
        location.reload();
        return true;
    }

    else if(!regex.test(writtenText)) {
        alert("Únicamente se permiten letras minúsculas y sin acentos")
        location.reload();
        return true;
    }
}

function btnEncrypt(){
    if (!textValidator()){   
        const encryptText = encrypt(textArea.value);
        message.value = encryptText;

        message.style.backgroundImage = "none";
        notFound.style.display = "none";
        textZone.style.display = "none";

        textArea.value = "";
        copy.style.display = "block";
    }
}

/*
    La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "a" es convertida para "ai"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat"
*/

function encrypt(stringEncrypted){

    let codeMatrix = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncrypted = stringEncrypted.toLowerCase();

    for (let i = 0; i < codeMatrix.length; i++){
        if (stringEncrypted.includes(codeMatrix[i][0])){
            stringEncrypted = stringEncrypted.replaceAll(codeMatrix[i][0], codeMatrix[i][1]);
        }
    }
    return stringEncrypted;
}

function btnDecrypt(){
    let writtenText = document.querySelector(".text-area").value;
    if (writtenText.length === 0){
        alert("Ingrese el texto encriptado primero")
        location.reload();
    }
    const encryptText = decrypt(textArea.value);
    message.value = encryptText;
    textArea.value = "";
}

function decrypt(stringDecrypt){
    let codeMatrix = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDecrypt = stringDecrypt.toLowerCase();

    for(let i = 0; i < codeMatrix.length; i++){
        if(stringDecrypt.includes(codeMatrix[i][1])){
            stringDecrypt = stringDecrypt.replaceAll(codeMatrix[i][1] , codeMatrix[i][0]);
        }
    }
    return stringDecrypt
}

function copier(){
    let encryptText = document.querySelector(".message").value; 
    if (encryptText.length === 0){
        alert("No hay nada que copiar");
        location.reload();
    }
    else {
        message.select();
        navigator.clipboard.writeText(message.value);
        message.value = "";
        alert("Texto Copiado!");
    }
}
