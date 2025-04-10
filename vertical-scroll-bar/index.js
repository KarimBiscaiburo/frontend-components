// Cantidad de propiedades a mostrar
const cantProperties = 21;

// Cantidad de botónes a mostrar
const cantButtons = Math.ceil(cantProperties / 3);

// Seleccionar el contenedor de los botónes
const buttonsContainer = document.querySelector(".scrollbar_buttons_container");

// Indice activo del botón
let activeIndex = 0;
// Variable para el intervalo de auto-scroll
let autoScrollInterval;

// Crea los botones, define sus clases, eventos y los agrega al DOM
for (let i = 0; i < cantButtons; i++) {
    // Crear el botón
    const button = document.createElement('button');

    // Definir la clase del botón según su posición
    switch (i) {
        case 0:
            button.className = "scrollbar_button active";
            break;
        case 1: 
            button.className = "scrollbar_button next";
            break;
        case 2:
            button.className = "scrollbar_button second";
            break;
        case 3: 
            button.className = "scrollbar_button third";
            break;
        default:
            button.className = "scrollbar_button";
            break;
    }

    button.setAttribute("index", i);

    // Evento de click
    button.addEventListener("click", () => {
        // Actualiza el índice activo
        activeIndex = i;
        // Actualiza los botones activos
        setButtonsVisible(i);
        // Inicia el auto-scroll
        startAutoScroll();
    });
    
    // Agregar el botón al DOM
    buttonsContainer.appendChild(button);
}

// Seleccina todos los botónes para evitar repetir el querySelector
const buttons = document.querySelectorAll(".scrollbar_button");

// Iniciar el auto-scroll al cargar la página
function startAutoScroll() {
    // Limpiar el intervalo anterior si existe
    clearInterval(autoScrollInterval);

    autoScrollInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % cantButtons; // vuelve a 0 si se pasa
        setButtonsVisible(activeIndex);
    }, 8000); // Cambiar "8000" por el tiempo deseado en milisegundos
}  
startAutoScroll(); 

function setButtonsVisible( index ) {
    // Primero, limpiar todas las clases
    buttons.forEach((button) => {
        button.className = "scrollbar_button";
    });

    // Aplicar la clase "active" al botón actual
    // El "?" es para verificar que el botón existe antes de agregar la clase
    buttons[index]?.classList.add("active");

    // Activar el botón anterior y siguiente
    buttons[index - 1]?.classList.add("next");
    buttons[index + 1]?.classList.add("next");

    // Botones secundarios
    buttons[index - 2]?.classList.add("second");
    buttons[index + 2]?.classList.add("second");

    // Botones terciarios
    buttons[index - 3]?.classList.add("third");
    buttons[index + 3]?.classList.add("third");
}