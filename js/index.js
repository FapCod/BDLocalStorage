const name= document.getElementById('name');
const last_name= document.getElementById('last_name');
const email= document.getElementById('email');
const password= document.getElementById('password');
const submit= document.getElementById('submit');
const access_password= document.getElementById('access_password');
const send_access= document.getElementById('send_access');
const formulario= document.getElementById('formulario');
const contenido = document.getElementById('contenido');
const close= document.getElementById('close');
const errase=document.getElementById('errase');

// imprimir datos para validacion
let data;
const imprimirDatos=(passwordAccessValue)=>{
    data= JSON.parse(localStorage.getItem(`${passwordAccessValue}`));
    console.log(data);
   
    const print_name= document.createElement('h3');
    const print_last_name= document.createElement('h3');
    const print_email= document.createElement('h3');
    // agregandole datos
    if(data){
    print_name.textContent= data[0];
    print_last_name.textContent=data[1];
    print_email.textContent=data[2];
    }
    contenido.append(print_name,print_last_name,print_email);

}
// borrar datos
document.addEventListener('click',(e)=>{
    if(e.target.matches('#close')){
        window.location.reload()
    }
    if(e.target.matches('#errase')){
        localStorage.removeItem(`${data[3]}`)
        window.location.reload();
    }
    
});
// validar formulario
const arrayValidation=[];
const BD=[];
const valorNombre=(nombreValue)=>{
    console.log(nombreValue);
    if(nombreValue.trim()){
        arrayValidation.push('nombre');
        BD.push(nombreValue);
    }
    
}
const valorApellido=(apellidoValue)=>{
    if(apellidoValue.trim()){
        arrayValidation.push('apellido');
        BD.push(apellidoValue);
    }
}
const valorEmail=(emailValue)=>{
    if(emailValue.trim()){
        arrayValidation.push('email');
        BD.push(emailValue);
    }
}
const valorPassword=(passwordValue)=>{
    if(passwordValue.trim()){
        arrayValidation.push('password');
        BD.push(passwordValue);
    }
}
const valorAccesoPass=(passwordAccessValue)=>{
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)==passwordAccessValue){
            imprimirDatos(passwordAccessValue);
        }else{
            console.log("Error no hay datos para este user");
        }
    }
}


document.addEventListener('change',(e)=>{
    e.preventDefault();
    e.target.matches('#name') ? valorNombre(e.target.value) : null
    e.target.matches('#last_name') ? valorApellido(e.target.value) : null
    e.target.matches('#email') ? valorEmail(e.target.value) : null
    e.target.matches('#password') ? valorPassword(e.target.value) : null
})
// guardando datos
formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(arrayValidation.length);
    for (let i = 0; i <= localStorage.length; i++) {
        if(arrayValidation.length==4 && localStorage.key(i)!= BD[3]){
            localStorage.setItem(`${BD[3]}`,JSON.stringify(BD));
            window.location.reload();
        }else if(localStorage.key(i)== BD[3]){
            alert("La contrasena ya esta en uso bro");
        }else{
            alert("Verifica los campos");
        }
        
    }

    name.value="";
    last_name.value="";
    email.value="";
    password.value="";
    BD.splice(0,4);
    
});

// Leer formulario
document.addEventListener('change',(e)=>{
    e.preventDefault();
    e.target.matches('#access_password') ? valorAccesoPass(e.target.value) : null
})