const { Conductor } = require('../models');

const crear = (data) => Conductor.create(data);
const listar = () => Conductor.findAll({ order: [['id', 'ASC']] });
const buscarPorId = (id) => Conductor.findByPk(id);
const actualizar = (id, data) => Conductor.update(data, { where: { id } });
const eliminar = (id) => Conductor.destroy({ where: { id } });

module.exports = { crear, listar, buscarPorId, actualizar, eliminar };
