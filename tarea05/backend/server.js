require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');
const placaRoutes = require('./routes/placaRoutes');
const conductorRoutes = require('./routes/conductorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', placaRoutes);
app.use('/api', conductorRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync(); // crea las tablas si no existen
  app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('No se pudo iniciar el servidor:', err);
  process.exit(1);
});
