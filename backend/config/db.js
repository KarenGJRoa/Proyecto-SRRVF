// ============================================================
//  config/db.js
//  Conexión a MongoDB Atlas con Mongoose
//  + Seed inicial de usuarios de prueba
// ============================================================
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('La variable MONGO_URI no está configurada');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);

    // Crear usuarios iniciales si la colección está vacía
    await seedUsers();
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detener el servidor si no hay BD
  }
};

// ── Datos de prueba ──────────────────────────────────────────
const seedUsers = async () => {
  const User = require('../models/User');

  const count = await User.countDocuments();
  if (count > 0) return; // Ya existen usuarios, no repetir

  // Usamos .save() para que el hook pre('save') encripte las contraseñas
  const usersData = [
    { nombre: 'Administrador',    email: 'admin@sspr.com',      password: 'admin123',     rol: 'admin'      },
    { nombre: 'Supervisor López', email: 'supervisor@sspr.com', password: 'super123',     rol: 'supervisor' },
    { nombre: 'Carlos Conductor', email: 'conductor@sspr.com',  password: 'conductor123', rol: 'conductor'  },
  ];

  for (const data of usersData) {
    await new User(data).save();
  }

  console.log('🌱 Usuarios iniciales creados correctamente');
};

module.exports = connectDB;
