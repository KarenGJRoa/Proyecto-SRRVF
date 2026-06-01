// ============================================================
//  models/User.js
//  Esquema de Usuario para MongoDB con Mongoose
// ============================================================
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type:      String,
      required:  [true, 'El nombre es obligatorio'],
      trim:      true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },
    email: {
      type:      String,
      required:  [true, 'El email es obligatorio'],
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:      String,
      required:  [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    rol: {
      type:    String,
      enum:    ['admin', 'supervisor', 'conductor'],
      default: 'conductor',
    },
  },
  { timestamps: true }
);

// ── Encriptar contraseña antes de guardar ────────────────────
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
