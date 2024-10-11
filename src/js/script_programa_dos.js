/*\
@autor: Cristopher Camacho Duran
Descripcion: Programa dos
*/


document.addEventListener('DOMContentLoaded', ()=>{
    const body = document.querySelector('body');
    body.addEventListener('click', listener);
    document.getElementById('options_campo_file').addEventListener('change', mostrar);
})

    
let datos = [], columnas = [], indice = 0, m =  [], columna_datosY = [], columna_datosX = [], sumaY = 0, archivo_opcion = 0;

const listener = (event)=>{

    if(event.target.id == 'generate') start();
    if(event.target.id =='calculate_cruce') algoritmo_programa_dos();

};

const start = ()=>{

    let file = document.getElementById('fileInput').files[0];
    if(file != undefined){

        leerCsv(file);
        modalActive('.col');
        
    } else{
        alert("Selecciona un archivo de tus documentos")
    }
};

function leerCsv  (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split('\n');
    rows.forEach(row => {
        const columns = row.split(','); 
        datos.push(columns);
    });

    detected(datos, file);
    }; 
    reader.readAsText(file);}


function detected (datos, file){
    let cont = 0;
    for (let i = 0; i < datos[0].length; i++) if(isNaN(parseFloat(datos[0][i]))) cont++;
    console.log(cont);

    if( cont != datos[0].length && cont > 0){
        
        for (let i = 0; i < datos.length; i++) {
            for (let j = 0; j < (datos[i].length); j++) {
                if(isNaN(parseFloat(datos[i][j])) && !columnas.includes(datos[i][j]) && datos[i][j] != ""){
                    columnas.push(datos[i][j]);
                    indice = j;
                }
            }
        }
        writeSelect(columnas);
        generarDatos(columnas);
    } else{
        writeSelectFile(file.name);
        archivo_opcion = 1;
    }
}


function writeSelect(columnas){

    let optionData = document.getElementById('options_campo_file');

    optionData.innerHTML = `<option value="-1">Selecciona</option>`;

    for (let i = 0; i < columnas.length; i++) optionData.innerHTML += `<option value="${(i)}">${columnas[i]}</option>`;
}

function writeSelectFile(nameFile){
    nameFile = nameFile.replace(".csv", "");
    let optionData = document.getElementById('options_campo_file');
    optionData.innerHTML = `<option value="-1">Selecciona</option>`;
    optionData.innerHTML += `<option value="0">${nameFile}</option>`;
}

function generarDatos(columnas){

    for (let i = 0; i < columnas.length; i++) {
        m.push([]);
    }

    for (let i = 0; i < datos.length; i++) {
            for (let k = 0; k < columnas.length; k++) {
                if(datos[i][indice] == columnas[k]){
                    let fila = datos[i];
                    fila.splice(indice, 1);
                    m[k].push(fila);
                    break;
                }
                
            }
    }
    console.log(m);

}

function mostrar(){
    let option_x = document.getElementById('optionX');
    let option_Y = document.getElementById('optionY');

    option_x.innerHTML = `<option value="-1">Seleccion</option>`;
        
    option_Y.innerHTML = `<option value="-1">Seleccion</option>`;

    if(archivo_opcion == 0){

        for (let i = 0; i < m[0][0].length; i++) option_x.innerHTML += `<option value="${i}">Columna ${(i+1)}</option>`;

        for (let i = 0; i < m[0][0].length; i++) option_Y.innerHTML += `<option value="${i}">Columna ${(i+1)}</option>`;

    }else{

    for (let i = 0; i < datos[0].length; i++) option_x.innerHTML += `<option value="${i}">${datos[0][i]}</option>`;

    for (let i = 0; i < datos[0].length; i++) option_Y.innerHTML += `<option value="${i}">${datos[0][i]}</option>`;

    }
    
}

function algoritmo_programa_dos(){

    columna_datosY = [], columna_datosX = [], sumaY = 0;

    let muestra = document.getElementById('options_campo_file').value;
    let columnaX = document.getElementById('optionX').value;
    let columnaY = document.getElementById('optionY').value;



    console.log(muestra);
    console.log(columnaX);
    console.log(columnaY);

    if(archivo_opcion == 0){

        for (let i = 0; i < m[muestra].length; i++) {
            let element =  m[muestra][i][columnaY];
            columna_datosY.push(parseFloat(element));
            sumaY += parseFloat(element);
        }

        for (let i = 0; i < m[muestra].length; i++) {
            let element = m[muestra][i][columnaX];
            columna_datosX.push(parseFloat(element));
            
        }
    } else{

        for (let i = 1; i < datos.length; i++) {
            let element = parseFloat(datos[i][columnaY]);
            
            
            if(element != undefined && !isNaN(element)){
                columna_datosY.push(parseFloat(element));
                sumaY += parseFloat(element);
            }
        }

        for (let i = 1; i < datos.length; i++) {
            let element = parseFloat(datos[i][columnaX]);
            if(element != undefined && !isNaN(element)){
                columna_datosX.push(element);

            }
        }
        console.log(columna_datosX);
        console.log(columna_datosY)


    }

    let yPromedio = sumaY / columna_datosY.length;
    let totalRSS = 0;

    for (let i = 0; i < columna_datosX.length; i++) {

        
        let xTemp = [...columna_datosX]; 
        let yTemp = [...columna_datosY]; 
        xTemp.splice(i, 1); 
        yTemp.splice(i, 1);

        // Calcular Beta 1 y Beta 0
        let B1 = calcularBeta1(xTemp, yTemp);
        let B0 = calcularBeta0(xTemp, yTemp, B1);

        // Calcular el valor y_predicho para cada xi
        let yPredicho = B1 * columna_datosX[i] + B0;
        let RSS = Math.pow((columna_datosY[i] - yPredicho), 2);

        totalRSS += RSS;
    }

    // Calcular R^2
    let r2 = calcularR2(totalRSS, yPromedio);
    console.log("R^2 = " + r2);

    if (r2 > 0.7) {
        console.log("La regresión lineal ofrece precisión en la predicción.");
    } else {
        console.log("La regresión lineal no es adecuada para estos datos.");
    }
    writeResultados(r2);
}

function writeResultados(r2){
    let result = document.getElementById('resultados');

    result.innerHTML = `
        <h2>Resultado</h2>
        <h4>R2 = ${r2}</h4>`;

        if (r2 > 0.7) {
            result.innerHTML += `<h5>La regresión lineal ofrece precisión en la predicción.</h5>`
        } else {
            result.innerHTML += `<h5>La regresión lineal no es adecuada para estos datos.</h5>`
        }
}


function calcularBeta1(x, y) {
    let n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
    }

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
}


function calcularBeta0(x, y, B1) {
    let sumX = 0, sumY = 0;
    let n = x.length;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
    }

    let xMean = sumX / n;
    let yMean = sumY / n;

    return yMean - B1 * xMean;
}


function calcularR2(totalRSS, yPromedio) {
    let sumVarianzaY = 0;

    for (let i = 0; i < columna_datosY.length; i++) {
        sumVarianzaY += Math.pow((columna_datosY[i] - yPromedio), 2);
    }

    return 1 - (totalRSS / sumVarianzaY);
}





