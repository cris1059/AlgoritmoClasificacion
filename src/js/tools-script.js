/*\
@autor: Cristopher Camacho Duran
Descripcion: Tools Script contiene herramientas de codigo reutilizable
*/
//VARIABLES QUE CONTIENEN EL ARCHIVO Y LO PERSISTEN EN EL FRONT
let json, arreglo;

//FUNCION PARA LEER UN ARCHIVO XLSX CON LAS DEPENDENCIAS DE NODE JS
function readFileXlsx(file) {
    

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = XLSX.utils.sheet_to_json(worksheet);
        writeTable();
        arreglo = arrayNomral();
        const currentFile = window.location.pathname.split("/").pop();
        console.log(currentFile);
        if(currentFile == 'programa_uno.html') algoritmo_programa_uno();
        if(currentFile == 'programa_dos.html') algoritmo_programa_dos();
    };

    reader.readAsArrayBuffer(file);
}


//FUNCION PARA ESCRIBIR UNA TABLA EN CUANQUIER TABLE
function writeTable() {
    if (!json || json.length === 0) return;

    const headers = Object.keys(json[0]);
    const headerRow = document.getElementById('headerRow');
    headerRow.innerHTML = '';
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    json.forEach(item => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}


//FUNCION PARA PASAR UN ARCHIVO DE TIPO JS A ARRAY NORMAL
function arrayNomral() {
    return json.reduce((acc, obj) => {
        Object.values(obj).forEach(value => acc.push(value));
        return acc;
    }, []);}

//FUNCION PARA ACTIVAR VENTANAS O MODALES
function modalActive(clase) {
    let active = document.querySelectorAll(clase);
    active.forEach(element =>{ element.classList.toggle('active')});
}

