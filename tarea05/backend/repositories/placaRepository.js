const { Placa } = require('../models');

const crear = (data) => Placa.create(data);
const listar = () => Placa.findAll({ order: [['id', 'ASC']] });
const buscarPorId = (id) => Placa.findByPk(id);
const actualizar = (id, data) => Placa.update(data, { where: { id } });
const eliminar = (id) => Placa.destroy({ where: { id } });

module.exports = { crear, listar, buscarPorId, actualizar, eliminar };
