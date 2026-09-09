const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbzqi5fPFdooBAqTeYEek5YL2uReT2rbtR0dQvmxj-iTJq35BrZ79JziJRGdep22LROU/exec";

let indiceEdicion = -1; 

document.addEventListener("DOMContentLoaded", cargarTabla);

function guardarEnSheet() {
    const nombre = document.getElementById("inputNombre").value;
    const rut = document.getElementById("inputRut").value;
    const edad = document.getElementById("inputEdad").value;
    const correo = document.getElementById("inputCorreo").value;
    const telefono = document.getElementById("inputTelefono").value;

    if (!validarDatos(nombre, rut, edad, correo, telefono)) {
        return;
    }

    const datos = {
        nombre: nombre,
        rut: rut,
        edad: edad,
        correo: correo,
        telefono: telefono
    };

    fetch(URL_GOOGLE_SHEET, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(datos)
    }).then(() => {
        alert("¡Datos enviados a Google Sheets correctamente!");
    }).catch(error => {
        console.error("Error al enviar a Sheets:", error);
    });

    guardarDato('Sheets');
}

function guardarDato(origen = 'Local') {
    const nombre = document.getElementById("inputNombre").value;
    const rut = document.getElementById("inputRut").value;
    const edad = document.getElementById("inputEdad").value;
    const correo = document.getElementById("inputCorreo").value;
    const telefono = document.getElementById("inputTelefono").value;

    if (nombre === "" || rut === "" || edad === "" || correo === "" || telefono === "") {
        alert("Por favor, llena todos los campos antes de guardar.");
        return;
    }

    let datosGuardados = JSON.parse(localStorage.getItem("datosAlumnosST")) || [];

    if (indiceEdicion === -1) {
        datosGuardados.push({ origen: origen, nombre: nombre, rut: rut, edad: edad, correo: correo, telefono: telefono });
    } else {
        datosGuardados[indiceEdicion] = { origen: origen, nombre: nombre, rut: rut, edad: edad, correo: correo, telefono: telefono };
        indiceEdicion = -1;
        document.getElementById("btnGuardar").textContent = "Guardar en LocalStorage";
    }
    localStorage.setItem("datosAlumnosST", JSON.stringify(datosGuardados));

    document.getElementById("inputNombre").value = "";
    document.getElementById("inputRut").value = "";
    document.getElementById("inputEdad").value = "";
    document.getElementById("inputCorreo").value = "";
    document.getElementById("inputTelefono").value = "";

    cargarTabla();
}

function cargarTabla() {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = ""; 

    let datosGuardados = JSON.parse(localStorage.getItem("datosAlumnosST")) || [];

    datosGuardados.forEach(function(registro, index) {
        let fila = document.createElement("tr");

        let textoOrigen = registro.origen === 'Sheets' ? '☁️ Sheets' : '💻 Local';
        
        fila.innerHTML = `
            <td><strong>${textoOrigen}</strong></td>
            <td>${registro.nombre}</td>
            <td>${registro.rut}</td>
            <td>${registro.edad}</td>
            <td>${registro.correo}</td>
            <td>${registro.telefono}</td>
            <td>
                <button onclick="editarDato(${index})" style="cursor:pointer; margin-right:5px;">✏️ Editar</button>
                <button onclick="eliminarDato(${index})" style="cursor:pointer; color: red;">🗑️ Eliminar</button>
            </td>
        `;
        
        cuerpoTabla.appendChild(fila);
    });
}

function eliminarDato(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        let datosGuardados = JSON.parse(localStorage.getItem("datosAlumnosST")) || [];
        datosGuardados.splice(index, 1);
        localStorage.setItem("datosAlumnosST", JSON.stringify(datosGuardados));
        cargarTabla();
    }
}

function editarDato(index) {
    let datosGuardados = JSON.parse(localStorage.getItem("datosAlumnosST")) || [];
    let registro = datosGuardados[index];

    document.getElementById("inputNombre").value = registro.nombre;
    document.getElementById("inputRut").value = registro.rut;
    document.getElementById("inputEdad").value = registro.edad;
    document.getElementById("inputCorreo").value = registro.correo;
    document.getElementById("inputTelefono").value = registro.telefono;

    indiceEdicion = index;
    document.getElementById("btnGuardar").textContent = "Actualizar Registro";
}
function validarDatos(nombre, rut, edad, correo, telefono) {
    if (nombre.trim() === "" || rut.trim() === "" || edad === "" || correo.trim() === "" || telefono.trim() === "") {
        alert("⚠️ Por favor, llena todos los campos antes de guardar.");
        return false;
    }
    if (isNaN(edad) || edad <= 0 || edad > 120) {
        alert("⚠️ Error: La edad debe ser un número válido mayor a 0.");
        return false;
    }
    const regexNumeros = /^[0-9]+$/;
    if (!regexNumeros.test(telefono)) {
        alert("⚠️ Error: El teléfono solo puede contener números (sin espacios ni letras).");
        return false;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
        alert("⚠️ Error: Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    return true; 
}
