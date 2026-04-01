# 📦 Sistema de Gestión de Inventario y Movimientos

Un sistema **Full Stack** para el control de stock en tiempo real. Permite gestionar productos, categorías y registrar movimientos de entrada/salida asegurando la integridad de los datos mediante transacciones SQL.



## ✨ Características

* **Panel de Inventario:** Visualización de productos con stock actual, SKU, marca y categoría.
* **Gestión CRUD:** Creación, edición y eliminación de productos y categorías.
* **Registro de Movimientos:** Modal dinámico para entradas y salidas de mercancía.
* **Actualización Automática:** El stock se actualiza inmediatamente al registrar un movimiento.
* **Seguridad de Datos:** Implementación de transacciones (BEGIN/COMMIT/ROLLBACK) en el backend para evitar errores de inventario.
* **Interfaz Moderna:** Diseño limpio y responsivo utilizando Tailwind CSS.

## 🛠️ Tecnologías

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Estilos)
* Axios (Peticiones HTTP)

**Backend:**
* Node.js & Express
* PostgreSQL (Base de Datos)
* PG (Pool de conexiones)
* UUID v4 (Identificadores únicos)

## 🚀 Instalación y Configuración

### 1. Requisitos previos
* Node.js instalado.
* PostgreSQL en ejecución.

### 2. Base de Datos
Crea una base de datos en PostgreSQL y ejecuta el script que esta en la carpeta GestorBackend Squema.sql


### 3. Encender back-end y front-end
En la consola de comando colocar "npm run dev" en el front-end y back-end


Desarrollado con ❤️ por [Shafiu]

