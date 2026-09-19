const service = require('../services/conductorService');

async function crear(req, res) {
  try {
    const sesionId = req.headers['x-sesion-id'] || 'anonimo';
    res.status(201).json(await service.crear(req.body, sesionId));
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
}

async function listar(req, res) {
  try {
    const { data, origen } = await service.listar();
    res.set('X-Data-Source', origen);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

async function actualizar(req, res) {
  try {
    res.json(await service.actualizar(req.params.id, req.body));
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
}

async function eliminar(req, res) {
  try {
    await service.eliminar(req.params.id);
    res.status(204).send();
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
}

module.exports = { crear, listar, actualizar, eliminar };
