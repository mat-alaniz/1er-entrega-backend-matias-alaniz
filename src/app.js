const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));// middleware es util cuando  espera recibir datos mediante metodo post.esta linea asegura q rl servidor pueda interpretar corretamente los datos.
//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Productos y Carritos!');
});


app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });



