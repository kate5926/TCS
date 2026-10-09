const express = require('express');
const router = express.Router();
const c = require('../controllers/conductorController');

router.get('/conductores', c.listar);
router.post('/conductores', c.crear);
router.put('/conductores/:id', c.actualizar);
router.delete('/conductores/:id', c.eliminar);

module.exports = router;
