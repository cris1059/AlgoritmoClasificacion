document.addEventListener('DOMContentLoaded', listen);

let json, arreglo, k, ks = [], promedio, desviacion, clasificacion = [];

function listen() {
    const body = document.querySelector('body');
    body.addEventListener('click', listener);
}

function listener(event) {
    if (event.target && event.target.id == 'generate') operations();
    if (event.target && event.target.id == 'clear') clear();
}

function operations() {
    k = document.getElementById('k').value;
    const file = document.getElementById('fileInput').files[0];
    console.log(file);
    console.log(k);
    if(file != undefined && k != ''){
        document.getElementById('clear').style.display = 'flex';
        lleno = 1;
        let active = document.querySelectorAll('.load');
        active.forEach(element =>{
        element.classList.toggle('active');
    });
    readFileXlsx(file);    
    } else{
        alert('Ingresa los campos que se te solicitan');
    }
}

function clear() {
    let active = document.querySelectorAll('.load');
        active.forEach(element =>{
        element.classList.toggle('active');
    })
    json, arreglo, k, ks = [], promedio, desviacion, clasificacion = []
    document.getElementById('table').innerHTML = `<table>
            <thead>
                <tr id="headerRow"></tr>
            </thead>
            <tbody id="tableBody">
                <!-- Las filas de datos se generarán dinámicamente -->
            </tbody>
        </table>`;
    document.getElementById('resultados').innerHTML = ``;
    document.getElementById('result_k').innerHTML = ``;
    document.getElementById('clear').style.display = 'none';
}

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
        algortirmo();
    };

    reader.readAsArrayBuffer(file);
}

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

function algortirmo() {
    desviacionEstandar(arreglo);
    let result  =  document.getElementById('resultados');
    result.innerHTML = `<label>Media Aritmetica: ${promedio}</label>
                        <label>Desviacion Estandar: ${desviacion}</label><br>`;
    calculateK();
    
}


function arrayNomral() {
    return json.reduce((acc, obj) => {
        Object.values(obj).forEach(value => acc.push(value));
        return acc;
    }, []);}


    function desviacionEstandar(arr) {
        if (arr.length === 0) return 0;
        promedio = arr.reduce((sum, value) => sum + value, 0) / arr.length;
        const sumaCuadrados = arr.reduce((sum, value) => sum + Math.pow(value - promedio, 2), 0);
        desviacion = Math.sqrt(sumaCuadrados / arr.length);
        
    }

    function calculateK() {
        for (let i = 1; i <= k; i++) {
            ks.push([(promedio - i*desviacion), (promedio+i*desviacion)]);
            clasificacion.push([]);
        }

        for(let i = 0; i < ks.length; i++){
            for(let j = 0; j < arreglo.length; j++){
                if(arreglo[j] >= ks[i][0] && arreglo[j] <= ks[i][1]) clasificacion[i].push(arreglo[j]);
            }
        }
        writeKcalculos();

    }

    function writeKcalculos() {
        for (let i = 0; i < ks.length; i++) {
            let window = document.getElementById('result_k');
            clasificacion[i].sort(function(a, b) {return a - b;});
            let porcentaje = (clasificacion[i].length*100)/arreglo.length;
            window.innerHTML += `<div class="k_section">
                                    <h3>Desviacion estandar donde k = ${(i+1)}</h3>
                                    <h4>Total = ${clasificacion[i].length} "${porcentaje}%"</h4>
                                    <h5>Clasificaion Ordenada</h5>
                                    <p>${clasificacion[i]}</p>
                                </div>`;
        }

    }