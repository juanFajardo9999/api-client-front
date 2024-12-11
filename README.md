# **Aplicación Cliente - Angular Frontend**

Esta aplicación permite la búsqueda de información básica de clientes ingresando su tipo y número de documento. Utiliza **Angular 18**, componentes **standalone**, **signals**, y está diseñada con **Bootstrap** para un diseño responsivo. 

---

## **Características**

1. **Pantalla de Inicio (Signin)**  
   - Permite ingresar el tipo y número de documento para buscar información de clientes.
   - **Validaciones:**
     - El número de documento debe tener entre 8 y 11 caracteres y contener solo números.
     - El botón de búsqueda se habilita únicamente cuando los campos son válidos.
   - **Tipos de documento disponibles:**
     - Cédula de ciudadanía
     - Pasaporte

2. **Pantalla de Resumen (Dashboard)**  
   - Muestra la información básica del cliente obtenido desde el backend.
   - Incluye un botón para regresar a la pantalla inicial.

3. **Componente Modal**  
   - Modal reutilizable para mostrar errores devueltos por el backend.
   - El backend devuelve errores en el siguiente formato:
     ```json
     {
       "message": "Client not found",
       "details": "No client found with documentType=C and documentNumber=234453221"
     }
     ```

4. **Header**  
   - Un encabezado con un título estático que se muestra en la parte superior de la aplicación.

---

## **Requisitos**

- **Node.js** (versión 20 o superior)
- **Angular CLI** (versión 18 o superior)
- **Bootstrap**

---

## **Instalación y Ejecución**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/juanFajardo9999/client-front.git
2. **Ejecutar la aplicación**
   ```bash
   ng s 
3. **Ejecutar Test unitarios**
   ```bash
   ng test
4. **Ejecutar Test de Covertura**
   ```bash
   ng test --no-watch --code-coverage
