# ☁️ Mi Primer Sistema Cloud

Este proyecto es una aplicación web sencilla desarrollada para la asignatura de **Computación en la Nube**. El sistema permite el registro y la gestión de usuarios mediante un CRUD (Crear, Leer, Actualizar, Eliminar), guardando los datos tanto localmente como en la nube.

---

## 🚀 Características Principales

*   **Interfaz de Ingreso:** Landing page básica (`index.html`) que da la bienvenida y redirige al sistema principal.
*   **CRUD Local:** Gestión completa de registros utilizando el `localStorage` del navegador para que los datos no se pierdan al recargar la página.
*   **Integración con la Nube:** Conexión directa a un documento de **Google Sheets** mediante Google Apps Script (`fetch` API) para respaldar la información ingresada.
*   **Diseño Modular:** Código organizado en carpetas independientes para mantener las mejores prácticas de desarrollo.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
*   **Backend / Nube:** Google Apps Script.
*   **Almacenamiento:** `localStorage` y Google Sheets.

---

## 📂 Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

```text
/
├── index.html          # Página principal y de bienvenida
├── sistema.html        # Panel del sistema (Formulario y Tabla CRUD)
├── css/
│   └── style.css       # Hoja de estilos del proyecto
├── js/
│   └── script.js       # Lógica del CRUD y conexión a la nube
└── assets/
    └── santotomas.png  # Logo institucional
