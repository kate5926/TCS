const express = require('express');
const router = express.Router();
const c = require('../controllers/placaController');

router.get('/placas', c.listar);
router.post('/placas', c.crear);
router.put('/placas/:id', c.actualizar);
router.delete('/placas/:id', c.eliminar);

module.exports = router;
