const Repartidor = require("../models/Repartidor");

const formatRepartidor = (repartidor) => ({
  id: repartidor._id,
  _id: repartidor._id,
  nombre: repartidor.nombre,
  telefono: repartidor.telefono,
  placa: repartidor.placa,
  estado: repartidor.estado,
  createdAt: repartidor.createdAt,
  updatedAt: repartidor.updatedAt,
});

const listRepartidores = async (req, res, next) => {
  try {
    const repartidores = await Repartidor.find().sort({ createdAt: -1 });
    res.json({
      total: repartidores.length,
      repartidores: repartidores.map(formatRepartidor),
    });
  } catch (err) {
    next(err);
  }
};

const getRepartidor = async (req, res, next) => {
  try {
    const rep = await Repartidor.findById(req.params.id);
    if (!rep) return res.status(404).json({ error: "Repartidor no encontrado" });
    res.json(formatRepartidor(rep));
  } catch (err) {
    next(err);
  }
};

const createRepartidor = async (req, res, next) => {
  try {
    const { nombre, telefono, placa, estado } = req.body;
    const rep = await Repartidor.create({ nombre, telefono, placa, estado });
    res.status(201).json({ message: "Repartidor creado", repartidor: formatRepartidor(rep) });
  } catch (err) {
    next(err);
  }
};

const updateRepartidor = async (req, res, next) => {
  try {
    const { nombre, telefono, placa, estado } = req.body;
    const updated = await Repartidor.findByIdAndUpdate(
      req.params.id,
      { nombre, telefono, placa, estado },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Repartidor no encontrado" });
    res.json({ message: "Repartidor actualizado", repartidor: formatRepartidor(updated) });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listRepartidores,
  getRepartidor,
  createRepartidor,
  updateRepartidor,
};
