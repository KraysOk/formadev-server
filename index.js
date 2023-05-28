// index.js o app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;

// Configura el middleware CORS
app.use(cors({
  origin: 'http://localhost:3001', // Cambia esto con la URL de tu aplicación de ReactJS
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
