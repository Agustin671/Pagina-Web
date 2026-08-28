document.addEventListener("DOMContentLoaded", cargarTabla);

function guardarDato() {
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

    datosGuardados.push({
        nombre: nombre,
        rut: rut,
        edad: edad,
        correo: correo,
        telefono: telefono
    });

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

    datosGuardados.forEach(function (registro) {
        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${registro.nombre}</td>
            <td>${registro.rut}</td>
            <td>${registro.edad}</td>
            <td>${registro.correo}</td>
            <td>${registro.telefono}</td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}