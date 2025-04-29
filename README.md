#  API de Productos y Carritos

Este proyecto consiste en el desarrollo de un servidor backend con Node.js y Express, que permite administrar productos y carritos de compra. La persistencia de datos se realiza mediante archivos JSON.

##  Estructura del Proyecto

- `/src/routes`: Rutas de la API (`products.router.js` y `carts.router.js`)
- `/src/managers`: Lógica de manejo de archivos (`ProductManager.js` y `CartManager.js`)
- `/src/data`: Archivos `products.json` y `carts.json` donde se guarda la información
- `app.js`: Punto de entrada de la aplicación

##  Funcionalidades

### Productos (`/api/products`)
- `GET /`: Lista todos los productos
- `GET /:pid`: Muestra un producto por ID
- `POST /`: Crea un nuevo producto
- `PUT /:pid`: Actualiza un producto
- `DELETE /:pid`: Elimina un producto

### Carritos (`/api/carts`)
- `POST /`: Crea un nuevo carrito
- `GET /:cid/products`: Lista los productos de un carrito
- `POST /:cid/products/:pid`: Agrega un producto al carrito

##  Tecnologías utilizadas

- Node.js
- Express
- File System (fs) para persistencia

##  Instalación

1. Cloná el repositorio  
   `git clone https://github.com/mat-alaniz/1er-entrega-backend-matias-alaniz`

2. Instalá las dependencias  
   ```bash
   npm install
