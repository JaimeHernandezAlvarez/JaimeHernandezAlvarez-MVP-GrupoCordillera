# MVP - Grupo Cordillera 🚀

Sistema Full-Stack con Arquitectura de Microservicios (Spring Boot) y Frontend (React + TypeScript).

## Estructura del Proyecto (Monorepo)

Este repositorio contiene tanto el backend como el frontend del proyecto, organizados de la siguiente manera:

- `/gateway` (Puerto 8080) - API Gateway y unificador de Swagger.
- `/auth-service` (Puerto 8081) - Gestión de usuarios y seguridad JWT.
- `/ingestion-service` (Puerto 8082) - CRUD y registro de ventas/transacciones.
- `/dashboard-service` (Puerto 8083) - Motor de cálculo de KPIs y métricas.
- `/frontend` - Aplicación cliente en React + TypeScript.
- `pom.xml` - POM Padre para compilar todo el backend con un solo comando.

---

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:
- **Java 17** (`java -version`)
- **Maven** (`mvn -version`)
- **Node.js y npm** (`node -v` y `npm -v`)
- **MySQL Local** (Corriendo en el puerto 3306)

---

## Guía de Instalación y Ejecución

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
- git clone <https://github.com/JaimeHernandezAlvarez/JaimeHernandezAlvarez-MVP-GrupoCordillera.git>
- cd JaimeHernandezAlvarez-MVP-GrupoCordillera
- code .

### 2. Configurar y compilar el Backend (Java)
Gracias a la arquitectura multimodular, no necesitas compilar cada servicio uno por uno. En la carpeta raíz del proyecto, ejecuta:
mvn clean install -DskipTests

### 3. Configurar el Frontend (React)
Abre una nueva terminal, navega a la carpeta del frontend e instala las dependencias:
cd MVP-FrontEnd
npm install

---

## Orden de Encendido de los Servicios

Para que el sistema funcione correctamente y no haya errores de conexión, debes levantar los servicios **estrictamente en este orden**:

1. **Base de Datos:** Verifica que tu servidor MySQL esté activo.
2. **Microservicios (Backend):** Levanta estos tres servicios desde tu IDE (pueden ser en cualquier orden entre ellos):
   - `ingestion-service`
   - `dashboard-service`
   - `auth-service`
3. **API Gateway:** Levanta el `gateway` al final para que pueda encontrar a los demás servicios.
4. **Frontend:** En tu terminal, dentro de la carpeta `/frontend`, ejecuta:
   npm run dev

---

## Enlaces de Acceso y Pruebas
Una vez que todo esté corriendo, puedes acceder a las diferentes partes del sistema:
- **Frontend (Interfaz de Usuario):** `http://localhost:5173` (o el puerto que te indique Vite/React).
- **Backend Swagger UI (Documentación API):** `http://localhost:8080/swagger-ui.html`
  *(Desde aquí puedes probar todos los endpoints del Auth, Ingestion y Dashboard usando el menú desplegable superior).*

### Credenciales de Prueba (Por defecto)
Para facilitar la evaluación de este MVP, el sistema cuenta con inicializadores automáticos. Cada vez que se levanta el proyecto con la base de datos vacía, se crea un usuario administrador y se inyectan datos de prueba (ventas, sucursales y empleados). 

Puedes ingresar al Frontend inmediatamente usando las siguientes credenciales:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

---

## Notas adicionales
- **CORS:** El backend ya está configurado para aceptar peticiones desde cualquier origen a través del Gateway. El Frontend utiliza un Proxy en Vite para evitar bloqueos del navegador al comunicarse con `http://localhost:8080`.
- **Node Modules:** Las carpetas de `node_modules` están ignoradas en el `.gitignore` principal. Si clonas el proyecto de nuevo, no olvides correr `npm install` en la carpeta frontend.