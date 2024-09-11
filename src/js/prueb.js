let media_x = 0, media_y = 0, multi = 0, cuadrado = 0, cont = 0;

let json = [
    {
        "poblacion estudiantil": 2,
        "venta trimestral": 58
    },
    {
        "poblacion estudiantil": 6,
        "venta trimestral": 105
    },
    {
        "poblacion estudiantil": 8,
        "venta trimestral": 88
    },
    {
        "poblacion estudiantil": 8,
        "venta trimestral": 118
    },
    {
        "poblacion estudiantil": 12,
        "venta trimestral": 117
    },
    {
        "poblacion estudiantil": 16,
        "venta trimestral": 137
    },
    {
        "poblacion estudiantil": 20,
        "venta trimestral": 157
    },
    {
        "poblacion estudiantil": 20,
        "venta trimestral": 169
    },
    {
        "poblacion estudiantil": 22,
        "venta trimestral": 149
    },
    {
        "poblacion estudiantil": 26,
        "venta trimestral": 202
    }
];
function algoritmo_programa_dos() {
    json.forEach((item, index) => {
        cont++;
        let elemt = 0;
        let x, y;
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                if(elemt == 0) {
                    x = parseInt(item[key])
                    media_x += x;
                    elemt = 1;
                } else {
                    y = parseInt(item[key])
                    media_y += y;
                }
            }
        }
        multi += (x-media_x)*(y-media_y);
        cuadrado += (x-media_x) ** 2;
    });

    let B1 = multi/cuadrado, B0 = media_y-(B1*media_x);
    media_x = media_x/cont;
    media_y = media_y/cont;
    console.log(`Media Aritmetica x = ${media_x}`);
    console.log(`Media Aritmetica y = ${media_y}`);
    console.log(`B1 = ${B1}`);
    console.log(`B0 = ${B0}`);
    console.log(`La ecuacion de la recta es: y = ${B0}+${B1}*X`);
    //y = B0+B1*X

}

algoritmo_programa_dos();
