// ============================================================
//  models/Order.js
//  Esquema de Pedido para MongoDB con Mongoose
// ============================================================
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    origen: {
      type:      String,
      required:  [true, 'El origen es obligatorio'],
      trim:      true,
      minlength: [3, 'El origen debe tener al menos 3 caracteres'],
      maxlength: [100, 'El origen no puede superar 100 caracteres'],
    },
    destino: {
      type:      String,
      required:  [true, 'El destino es obligatorio'],
      trim:      true,
      minlength: [3, 'El destino debe tener al menos 3 caracteres'],
      maxlength: [100, 'El destino no puede superar 100 caracteres'],
    },
    cliente: {
      type:      String,
      required:  [true, 'El cliente es obligatorio'],
      trim:      true,
      minlength: [2, 'El cliente debe tener al menos 2 caracteres'],
      maxlength: [100, 'El cliente no puede superar 100 caracteres'],
    },
    descripcion: {
      type:      String,
      required:  [true, 'La descripción es obligatoria'],
      trim:      true,
      minlength: [5, 'La descripción debe tener al menos 5 caracteres'],
      maxlength: [300, 'La descripción no puede superar 300 caracteres'],
    },
    estado: {
      type:    String,
      enum:    ['Pendiente', 'En tránsito', 'Entregado', 'Cancelado'],
      default: 'Pendiente',
    },
  },
  { timestamps: true }   // agrega createdAt y updatedAt automáticamente
);

module.exports = mongoose.model('Order', orderSchema);
