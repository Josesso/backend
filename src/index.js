const express = require('express');
var cors = require('cors')

const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const simulacionRoutes = require('./routes/simulacionRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: "http://localhost:5173",credentials: true}));

app.use(express.json());
app.use(cookieParser());

app.use('/usuarios', usuarioRoutes);
app.use('/procesos', procesoRoutes);
app.use('/simulaciones', simulacionRoutes);

/*// Middleware para verificar JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


// Rutas protegidas con JWT
app.use('/procesos', authenticateJWT, procesoRoutes);
app.use('/simulaciones', authenticateJWT, simulacionRoutes);
*/

// Sincronizar con la base de datos y levantar el servidor
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
