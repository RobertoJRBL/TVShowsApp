# TvShow Manager

TvShow Manager es una aplicación web diseñada para gestionar programas de televisión. Permite a los usuarios agregar, editar, eliminar y buscar programas, así como filtrarlos por favoritos y paginar los resultados. La aplicación proporciona una interfaz amigable, utilizando Angular 18 y Bootstrap 5, lo que la hace atractiva y fácil de usar.

## Funcionalidad

- Agregar Programa: Los usuarios pueden añadir nuevos programas de televisión a la lista.
- Editar Programa: Los programas existentes se pueden editar para actualizar su información.
- Eliminar Programa: Los usuarios tienen la opción de eliminar programas que ya no deseen.
- Buscar: Se incluye una funcionalidad de búsqueda para encontrar programas por nombre.
- Filtrar Favoritos: Los usuarios pueden filtrar la lista para mostrar solo los programas marcados como favoritos.
- Paginación: Los resultados se presentan en páginas, con la opción de seleccionar cuántos resultados mostrar por página.

## Estructura del Proyecto

- src/app/: Contiene los componentes, servicios y modelos de la aplicación.
- src/assets/: Archivos estáticos como imágenes y estilos.
- src/styles.css: Estilos globales de la aplicación.
- src/app/tv-show/: Componente principal que gestiona la lógica de los programas de televisión.

## Uso

1. Clona el repositorio y navega al directorio del proyecto.
2. Instala las dependencias utilizando `npm install`.
3. Cambia la URL del backend en el servicio `tv-show.service.ts` a la dirección correcta del repositorio backend.
4. Inicia el servidor de desarrollo con `ng serve`.
5. Abre un navegador y accede a `http://localhost:4200` para ver la aplicación en acción.
6. Agrega nuevos programas haciendo clic en "Agregar Programa".
7. Utiliza la barra de búsqueda para encontrar programas por nombre.
8. Filtra los programas por favoritos utilizando los botones correspondientes.
9. Cambia la cantidad de resultados por página en el menú desplegable.
10. Navega entre las páginas utilizando los botones de paginación.
