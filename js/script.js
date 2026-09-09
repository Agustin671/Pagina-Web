const URL_GOOGLE_SHEET = "https://script.google.com/macros/s/AKfycbzqi5fPFdooBAqTeYEek5YL2uReT2rbtR0dQvmxj-iTJq35BrZ79JziJRGdep22LROU/exec";

let indiceEdicion = -1;

document.addEventListener("DOMContentLoaded", cargarTabla);

function formatearRut(input) {
    let rut = input.value.replace(/[^0-9kK]/g, '').toUpperCase();
    
    if (rut.length <= 1) {
        input.value = rut;
        return;
    }

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    let cuerpoFormateado = "";
    for (let i = cuerpo.length - 1, j = 1; i >= 0; i--, j++) {
        cuerpoFormateado = cuerpo.charAt(i) + cuerpoFormateado;
        if (j % 3 === 0 && i !== 0) {
            cuerpoFormateado = "." + cuerpoFormateado;
        }
    }

    input.value = cuerpoFormateado + "-" + dv;
}

function validarDatos(nombre, rut, edad, correo, telefono) {
    if (nombre.trim() === "" || rut.trim() === "" || edad === "" || correo.trim() === "" || telefono.trim() === "") {
        alert("⚠️ Por favor, llena todos los campos antes de guardar.");
        return false;
    }

    if (rut.length < 11) {
        alert("⚠️ Error: El RUT ingresado está incompleto.");
        return false;
    }

    if (isNaN(edad) || edad <= 0 || edad > 120) {
        alert("⚠️ Error: La edad debe ser un número válido mayor a 0.");
        return false;
    }

    if (telefono.length !== 9) {
        alert("⚠️ Error: El teléfono debe tener exactamente 9 números.");
        return false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("⚠️ Error: Por favor, ingresa un correo electrónico válido (ej: usuario@correo.com).");
        return false;
    }

    return true; 
}

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

    if (!validarDatos(nombre, rut, edad, correo, telefono)) {
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
