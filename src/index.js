const express = require('express');
var cors = require('cors')

const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const simulacionRoutes = require('./routes/simulacionRoutes');
const fallosRoutes = require('./routes/falloRoutes')
const Fallo = require('./models/fallo');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//app.use(cors({origin: "https://front-end-two-sandy.vercel.app/",credentials: true}));
const allowedIps = ['https://front-end-two-sandy.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    // Verificar si la IP está permitida
    if (allowedIps.indexOf(origin) !== -1 || !origin) {
      callback(null, true); 
    } else {
      callback(new Error('No permitido por CORS')); 
    }
  }
};

app.use(cors({
  origin: corsOptions,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/usuarios', usuarioRoutes);
app.use('/procesos', procesoRoutes);
app.use('/simulaciones', simulacionRoutes);
app.use('/fallos', fallosRoutes)
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
