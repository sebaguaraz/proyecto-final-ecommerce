# Proyecto Final Ecommerce

Proyecto final del curso de Programación Backend.

## Descripción

Aplicación backend para administrar productos y carritos de compra de un ecommerce.

El sistema permite crear, consultar, actualizar y eliminar productos, además de crear carritos, agregar productos, modificar cantidades y vaciar carritos.

## Funcionalidades principales

- CRUD completo de productos.
- Paginación de productos.
- Filtro por categoría y disponibilidad.
- Ordenamiento por precio.
- CRUD de carritos.
- Agregado y eliminación de productos del carrito.
- Actualización de cantidades.
- Uso de MongoDB y Mongoose.
- Implementación previa conservada con FileSystem.
- Vistas con Handlebars.
- Actualización de productos en tiempo real con WebSockets.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Express Handlebars
- Socket.IO
- FileSystem
- Postman

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/sebaguaraz/proyecto-final-ecommerce.git
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` con la conexión a MongoDB:

```env
PORT=8080
URL_CONNECTION_CLUSTER_MONGODB=TU_CONEXION_A_MONGODB
```

Iniciar el servidor:

```bash
npm start
```

Para desarrollo:

```bash
npm run dev
```

## Endpoints principales

### Productos

```text
GET    /api/products
GET    /api/products/:pid
POST   /api/products
PUT    /api/products/:pid
DELETE /api/products/:pid
```

### Carritos

```text
POST   /api/carts
GET    /api/carts/:cid
POST   /api/carts/:cid/products/:pid
DELETE /api/carts/:cid/products/:pid
PUT    /api/carts/:cid
PUT    /api/carts/:cid/products/:pid
DELETE /api/carts/:cid
```

## Vistas

```text
/products
/products/:pid
/carts/:cid
```

## Persistencia

La versión final utiliza MongoDB mediante Mongoose.

También se conserva una implementación anterior basada en FileSystem dentro de:

```text
dao/fileSystem/
data/
```

## Autor

Sebastián Guaraz
