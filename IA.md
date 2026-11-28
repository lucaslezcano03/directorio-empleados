# Declaración de uso de inteligencia artificial

## Herramienta utilizada

-   **Herramienta:** ChatGPT, de OpenAI.
-   **Finalidad:** apoyo durante el desarrollo, comprensión, revisión y
    documentación del proyecto.

## Cómo se utilizó

ChatGPT se utilizó como herramienta de apoyo para comprender conceptos
de Ionic, Angular y Capacitor, revisar fragmentos de código, analizar
errores y proponer mejoras puntuales.

La asistencia estuvo relacionada con los siguientes temas:

-   Organización de la aplicación en tres pestañas y navegación entre
    páginas.
-   Uso de servicios de Angular para separar el consumo de datos y la
    lógica de persistencia.
-   Consumo de la API de empleados mediante `HttpClient`.
-   Búsqueda y ordenamiento alfabético de empleados.
-   Agrupación de empleados por departamento.
-   Guardado, recuperación y eliminación de favoritos mediante Capacitor
    Preferences.
-   Manejo de estados de carga, mensajes de error y reintentos.
-   Revisión de dependencias, comandos de ejecución y preparación de la
    documentación.

## Prompts principales utilizados

Los siguientes ejemplos resumen los tipos de consultas realizadas
durante el trabajo. Son descripciones de las solicitudes y no
transcripciones literales de cada conversación:

1.  Solicitar explicaciones sobre la estructura de componentes, páginas
    y servicios de Ionic con Angular.
2.  Pedir ayuda para revisar el consumo de datos JSON desde una API y
    organizar la lógica en un servicio.
3.  Consultar cómo implementar búsqueda y ordenamiento de empleados.
4.  Solicitar revisión de la agrupación de empleados por departamento.
5.  Consultar cómo guardar y recuperar empleados favoritos utilizando
    Capacitor Preferences.
6.  Pedir ayuda para revisar estados de carga, errores y actualización
    de la interfaz.
7.  Solicitar apoyo para preparar el README y documentar los ejercicios
    de clase que sirvieron como antecedente.

## Partes del proyecto que recibieron asistencia

La asistencia se concentró en la comprensión, revisión y mejora de fragmentos relacionados con:

- `tab1/`: listado de empleados, búsqueda, ordenamiento y selección de favoritos.
- `tab2/`: agrupación y visualización de empleados por departamento.
- `tab3/`: recuperación y administración de empleados favoritos.
- `services/empleados.service.ts`: consulta de empleados mediante `HttpClient`.
- `services/favoritos.service.ts`: persistencia local de identificadores de favoritos con Capacitor Preferences.
- `README.md` e `IA.md`: organización y redacción de la documentación del proyecto.
- Configuración de la plataforma Android mediante Capacitor, sincronización del proyecto y generación del APK.

La IA no se utilizó para generar automáticamente la totalidad de la aplicación. Las sugerencias y fragmentos recibidos fueron revisados y adaptados al código del proyecto.


## Comprobaciones realizadas

Durante la etapa de revisión se ejecutaron los siguientes comandos
en el entorno local del proyecto:

- `npm run lint`: ejecutado correctamente. ESLint no detectó
  errores y Prettier confirmó que los archivos cumplen con
  el formato establecido.

- `npm test`: ejecutado correctamente. Se aprobaron las 6 pruebas
  unitarias y la prueba end-to-end configurada con Playwright.

- `npm run build`: compilación completada correctamente.
  Se presentaron advertencias relacionadas con versiones de
  navegadores configuradas en Browserslist y el presupuesto
  de tamaño de algunos archivos SCSS, sin impedir la compilación.

Las comprobaciones fueron ejecutadas localmente para verificar
el funcionamiento, la consistencia y la preparación del proyecto.

## Responsabilidad académica

El uso de ChatGPT fue complementario. El estudiante es responsable del código incorporado, de comprender su funcionamiento, de verificar los resultados y de poder explicar las decisiones de implementación durante la evaluación.
