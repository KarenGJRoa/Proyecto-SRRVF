const Order = require("../models/Order");

const formatOrder = (order) => ({
  id: order._id,
  _id: order._id,
  origen: order.origen,
  destino: order.destino,
  cliente: order.cliente,
  descripcion: order.descripcion,
  estado: order.estado,
  creadoEn: order.createdAt,
  actualizadoEn: order.updatedAt,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
});

const listOrders = async (req, res, next) => {
  try {
    const filter = req.query.estado
      ? { estado: new RegExp(`^${req.query.estado}$`, "i") }
      : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ total: orders.length, orders: orders.map(formatOrder) });
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(formatOrder(order));
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { origen, destino, cliente, descripcion, estado } = req.body;
    const order = await Order.create({ origen, destino, cliente, descripcion, estado });
    res.status(201).json({ message: "Pedido creado exitosamente", order: formatOrder(order) });
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { origen, destino, cliente, descripcion, estado } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { origen, destino, cliente, descripcion, estado },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido actualizado", order: formatOrder(updated) });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Estado actualizado", order: formatOrder(updated) });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
