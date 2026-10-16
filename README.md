# La Velada del Año – Web oficial

Proyecto de desarrollo web de la web oficial de una edición ficticia de La Velada del Año.

> Proyecto académico

> Es una edición **ficticia** creada con fines educativos: los combates, luchadores, horarios, precios y el material gráfico son inventados y de creación propia. No tiene relación con la organización oficial de La Velada del Año.

**Web publicada:** https://camilokurk.github.io/la-velada-web/

## Estructura

```
la-velada-web/
├── index.html
├── pages/
│   ├── combats.html
│   ├── faq.html
│   ├── tickets.html
│   └── press.html
├── css/
│   └── style.css
├── js/
│   ├── dark-mode.js
│   ├── countdown.js
│   ├── combats-data.js
│   ├── combats.js
│   ├── price-calc.js
│   ├── validation-confirmation.js
│   └── summary-reservation.js
├── assets/
│   └── images/
│       ├── general/
│       ├── home/
│       ├── combats/
│       │   └── fighters/
│       └── tickets/
├── README.md
└── .gitignore
```

## Rutas


| Desde          | CSS                | JS e imágenes             | Enlace a Inicio | Enlace a otra página |
| -------------- | ------------------ | -------------------------- | --------------- | --------------------- |
| `index.html`   | `css/style.css`    | `js/…`, `assets/…`       | `index.html`    | `pages/combats.html`  |
| `pages/*.html` | `../css/style.css` | `../js/…`, `../assets/…` | `../index.html` | `combats.html`        |

**Importante:** las rutas de imágenes dentro de los archivos JS se escriben desde la página que los carga, no desde `js/`.
Ejemplo en `combats-data.js`: `../assets/images/combats/fighters/nombre.jpg`

## Normas

- Nombres de archivo en minúsculas, sin tildes, sin ñ y sin espacios.
- Un único `style.css`, ordenado por bloques: variables, estilos comunes y un bloque por página.
- Los scripts se cargan con `defer` y `combats-data.js` va antes que `combats.js`.

### Commits

- Empezar siempre con la clave de la tarea de Jira: `G4-XX`.
- Después, un verbo en infinitivo que diga qué se ha hecho: Añadir, Corregir, Actualizar, Eliminar…
- Una sola línea y corta. Si hace falta explicar mucho, mejor dividirlo en varios commits.
- Ejemplo: `G4-10 Añadir estructura común (header, menú y footer) en las 5 páginas`
