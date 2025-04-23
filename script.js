// Obtenemos el formulario y el cuerpo de la tabla
const form = document.getElementById('task-form');
const tableBody = document.querySelector('#todo-table tbody');

// Inicializamos un array vacío para almacenar las tareas
let tasks = [];

// Agregamos un event listener al formulario para cuando se envíe
form.addEventListener('submit', function(e) {
    // Prevenimos el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Obtenemos los valores de los inputs, eliminando espacios en blanco al inicio y final
    const task = document.getElementById('task-input').value.trim();
    const desc = document.getElementById('desc-input').value.trim();

    // Verificamos que ambos campos tengan contenido
    if (task && desc) {
        // Agregamos la nueva tarea al array de tareas, con un estado "checked" inicializado en falso
        tasks.push({ task, desc, checked: false });

        // Renderizamos las tareas en la tabla
        renderTasks();

        // Limpiamos el formulario
        form.reset();
    }
});

// Función para renderizar las tareas en la tabla
function renderTasks() {
    // Limpiamos el contenido del cuerpo de la tabla
    tableBody.innerHTML = '';

    // Iteramos sobre el array de tareas
    tasks.forEach((item, idx) => {
        // Creamos una nueva fila para la tabla
        const row = document.createElement('tr');

        // Insertamos el HTML para cada celda de la fila, incluyendo los botones de "Check list", "Editar" y "Eliminar"
        row.innerHTML = `
            <td class="type${item.checked ? ' checked' : ''}">${item.task}</td>
            <td class="value${item.checked ? ' checked' : ''}">${item.desc}</td>
            <td class="check">
                <button class="checklist-btn" onclick="toggleCheck(${idx})">
                    ${item.checked ? '✓' : 'Check list'}
                </button>
            </td>
            <td>
                <button class="edit-btn" onclick="editTask(${idx})">Editar</button>
                <button class="delete-btn" onclick="deleteTask(${idx})">Eliminar</button>
            </td>
        `;

        // Agregamos la fila al cuerpo de la tabla
        tableBody.appendChild(row);
    });
}

// Función global para cambiar el estado "checked" de una tarea
window.toggleCheck = function(idx) {
    // Invertimos el valor de "checked" para la tarea en el índice dado
    tasks[idx].checked = !tasks[idx].checked;

    // Renderizamos las tareas para actualizar la interfaz
    renderTasks();
}

// Función global para eliminar una tarea
window.deleteTask = function(idx) {
    // Eliminamos la tarea en el índice dado del array de tareas
    tasks.splice(idx, 1);

    // Renderizamos las tareas para actualizar la interfaz
    renderTasks();
}

// Función global para editar una tarea
window.editTask = function(idx) {
    // Solicitamos al usuario un nuevo valor para la tarea y la descripción
    const newTask = prompt('Editar tarea:', tasks[idx].task);
    const newDesc = prompt('Editar descripción:', tasks[idx].desc);

    // Verificamos que el usuario haya ingresado un valor y que no esté vacío
    if (newTask !== null && newDesc !== null && newTask.trim() && newDesc.trim()) {
        // Actualizamos la tarea y la descripción en el array de tareas
        tasks[idx].task = newTask.trim();
        tasks[idx].desc = newDesc.trim();

        // Renderizamos las tareas para actualizar la interfaz
        renderTasks();
    }
}

// Renderizado inicial de las tareas (vacío)
renderTasks();
