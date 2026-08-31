const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'contactos.json');

const db = {
  async leer() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  },

  async guardar(datos) {
    await fs.writeFile(filePath, JSON.stringify(datos, null, 2), 'utf-8');
  }
};

module.exports = db;