// Arreglo de las preguntas
const preguntas = [

    {
        id: 1,
        pregunta: "Pregunta 1",
        respuesta: "c"
    },

    {
        id: 2,
        pregunta: "Pregunta 2",
        respuesta: "b"
    },

    {
        id: 3,
        pregunta: "Pregunta 3",
        respuesta: "d"
    },

    {
        id: 4,
        pregunta: "Pregunta 4",
        respuesta: "d"
    },

    {
        id: 5,
        pregunta: "Pregunta 5",
        respuesta: "a"
    },

    {
        id: 6,
        pregunta: "Pregunta 6",
        respuesta: "c"
    },

    {
        id: 7,
        pregunta: "Pregunta 7",
        respuesta: "b"
    },

    {
        id: 8,
        pregunta: "Pregunta 8",
        respuesta: "c"
    },

]

//Arreglo que se llenara con las respuestas
let respuestas = [];

//variable para mostrar el contenido del quiz
let quiz = ``;

//variable para mostrar los botones con la cantidad de preguntas que hay
let numeros = ``;

//variable para determinar que pregunta se mostrara
let posicion = 0;

//Funcion de JQuery que se ejecuta al hacer click en el boton con el id "entrar"
$('#entrar').click(function Ingresar() {

    //Obteniendo el valor de los campos "nombre" y "apellido"
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;

    //condicion para acceder al quiz o no
    if (nombre != "" && apellido != "") {

        $("#formulario").hide();
        $("#usuario").html(`Usuario Activo: ${nombre} ${apellido}`);
        

        document.getElementById('container').classList.add('container');
        
        //ejecucion de las funciones
        listapreguntas();
        RealizarQuiz();

    } else {

        //se muestra una alerta si algunos de los campos esta vacio
        alert('Es necesario llenar los campos');
    }

})


//funcion que recorre el arreglo de preguntas
function listapreguntas() {
    for (let i = 0; i < preguntas.length; i++) {

        //agrega un boton por cada pregunta del arreglo a la variable numeros
        numeros = numeros + `<button data-id="${i}" class="seleccionar"> ${i + 1} </button>`;

        //dibuja en el contenedor con el id "numeros" lo que esta en la variable "numeros"
        $("#numeros").html(numeros);

    }

    //se obtienen todos los botones de la variable numero mediante la clase "seleccionar" y se agregan a la variable links
    let links = document.getElementsByClassName('seleccionar');

    //se crea un arreglo donde cada posicion corresponde a cada uno de los botones dentro de "links"
    let array = [...links]

    //se recorre el arreglo "array" y se le agrega el evento "click" a cada uno, se le asigna a la variable posicion
    //el valor del data-id del boton al que se le hizo click
    array.forEach(link => {
        link.addEventListener('click', function () {
            posicion = link.dataset.id;

            //cuando se le hace click a un de los botones se ejecuta la funcion RealizarQuiz
            RealizarQuiz();
        })
    })

}

function RealizarQuiz() {

    if (posicion < 8) {
        quiz = `<h2 id="pregunta" class="titulopregunta" > ${preguntas[posicion].pregunta} de ${preguntas.length} </h2>
        <input type="radio" name="respuesta" id="respuesta" value="a"> <label for="a"> A </label> <br>
        <input type="radio" name="respuesta" id="respuesta" value="b"> <label for="b"> B </label> <br>
        <input type="radio" name="respuesta" id="respuesta" value="c"> <label for="c"> C </label> <br>
        <input type="radio" name="respuesta" id="respuesta" value="d"> <label for="d"> D </label> <br>
        <input type="radio" name="respuesta" id="respuesta" value="ninguna" checked="true" hidden>
        <input type="submit" id="responder" onclick="SiguientePregunta()" value="Siguiente">
    `
    } else {
        quiz = `Usted a terminado el Quiz. <br>
                ${resultados()}
        `
    }

    //se dibuja en el contenedor con el id "preguntas" lo que se encuentra en la variable "quiz"
    $("#preguntas").html(quiz);

}

function SiguientePregunta() {

    //se obtienen los radio buttons con las opciones de respuesta
    document.getElementsByName('respuesta').forEach(radio => {
        
        //condiciones que suceden cuando uno de los botones esta seleccionado
        if (radio.checked) {

            //se le asigna el valor del radio button al vector respuestas en la posicion correspondiente a la pregunta seleccionada
            respuestas[posicion] = radio.value;

            //se compara si el atributo respuesta del arreglo de preguntas corresponde con la respuesta ingresada
            //y se muestra por consola si estaba correcta o incorrecta
            if (preguntas[posicion].respuesta == respuestas[posicion]) {
                console.log('la respuesta es correcta');
            } else {
                console.log('la respuesta es incorrecta');
            }

        }
    })

    //aumento en la posicion en 1
    posicion++

    //ejecucion de la funcion
    RealizarQuiz();

}


function resultados() {

    let texto = ``;

    //se recorre el arreglo de preguntas y se agrega el texto a una varible 
    for (let i = 0; i < preguntas.length; i++) {

        texto = texto + `La respuesta de la pregunta ${preguntas[i].id} es ${preguntas[i].respuesta}.
                         La respuesta seleccionada fue ${respuestas[i]} <br>
                        `
    }

    return texto;

}