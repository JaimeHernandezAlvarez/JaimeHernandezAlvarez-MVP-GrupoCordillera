# MVP-GrupoCordillera
Mvp del Proyecto de Evaluación de proyectos de software

# MVP Backend - Grupo Cordillera 🚀

Arquitectura de microservicios desarrollada con Spring Boot y Spring Cloud Gateway.

## 🛠️ Requisitos previos
- Java 17 instalado (`java -version`).
- Maven instalado (`mvn -version`).
- MySQL corriendo en el puerto 3306.

## 🚀 Cómo levantar el proyecto por primera vez

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-url-de-github>
   cd <nombre-de-la-carpeta>
Descargar dependencias (En la carpeta raíz):
Gracias a la arquitectura multimodular, puedes compilar todo con un solo comando:

Bash
mvn clean install -DskipTests
Orden de encendido:
Abre las carpetas y ejecuta los servicios en este orden estricto:

ingestion-service (Puerto 8082)

dashboard-service (Puerto 8083)

auth-service (Puerto 8081)

gateway (Puerto 8080) - Siempre al final

Acceso a la API (Swagger UI unificado):
Entra a: http://localhost:8080/swagger-ui.html