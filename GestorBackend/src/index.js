const express = require('express');
const db = require('./db'); 
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

/* CONEXION DE PRUEBA
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()'); 
    res.json({ 
      mensaje: "Conexión exitosa", 
      hora_servidor_db: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error conectando a la base de datos");
  }
});
*/

const categorias = require ('./routes/categorias.routes')
const productos = require ('./routes/products.routes')
const movimientos = require ('./routes/movimientos.routes')
app.use(express.json())

app.use(cors());
app.use(categorias)
app.use(productos)
app.use(movimientos)

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});