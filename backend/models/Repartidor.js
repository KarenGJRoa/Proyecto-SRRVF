// ============================================================
//  models/Repartidor.js
//  Esquema de Repartidor para MongoDB con Mongoose
// ============================================================
const mongoose = require('mongoose');

const repartidorSchema = new mongoose.Schema(
  {
    nombre: {
      type:      String,
      required:  [true, 'El nombre es obligatorio'],
      trim:      true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },
    telefono: {
      type:     String,
      required: [true, 'El teléfono es obligatorio'],
      match:    [/^[0-9]{7,15}$/, 'Teléfono inválido: solo dígitos, 7–15 caracteres'],
    },
    placa: {
      type:     String,
      required: [true, 'La placa es obligatoria'],
      match:    [/^[A-Z0-9]{3}-?[0-9]{3}$/, 'Formato de placa inválido (ej: ABC-123)'],
    },
    estado: {
      type:    String,
      enum:    ['Disponible', 'En ruta', 'No disponible'],
      default: 'Disponible',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Repartidor', repartidorSchema);
