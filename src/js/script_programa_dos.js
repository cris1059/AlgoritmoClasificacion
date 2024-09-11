document.addEventListener('DOMContentLoaded', () => document.querySelector('body').addEventListener('click', listen));


const listen = (event) => {

    if(event.target && event.target.id == 'generate') generate(event.target.id);

}


function generate(id) {

    const file = document.getElementById('fileInput').files[0];
    console.log(file);
    if(file != undefined){
        document.getElementById('clear').style.display = 'flex';
        lleno = 1;
        let active = document.querySelectorAll('.load');
        active.forEach(element =>{ element.classList.toggle('active')});
        readFileXlsx(file);    
    } else{
        alert('Ingresa los campos que se te solicitan');
    }
}


function algoritmo_programa_dos() {
    console.log(json);
}