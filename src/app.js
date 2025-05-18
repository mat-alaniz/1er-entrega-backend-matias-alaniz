const express = require('express');
const exphbs = require('express-handlebars');
const { createServer } = require('http'); 
const { Server } = require('socket.io');  
const path = require('path');
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();

app.engine('handlebars', exphbs.engine({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});


const httpServer = createServer(app);
const io = new Server(httpServer);
let productosActualizados = [];

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('updateProducts', productosActualizados);

  socket.on('addProduct', (productData) => {
    const newProduct = { ...productData, id: Date.now().toString() };
    productosActualizados.push(newProduct);
    io.emit('updateProducts', productosActualizados);
  });
  socket.on('deleteProduct', (productId) => {
    productosActualizados = productosActualizados.filter(p => p.id !== productId);
    io.emit('updateProducts', productosActualizados);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});






