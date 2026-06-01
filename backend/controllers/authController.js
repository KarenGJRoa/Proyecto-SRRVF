const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = async (req, res, next) => { 
  try {
    const { email, password } = req.body;

const user = await User.findOne({ email });
console.log("USUARIO ENCONTRADO:", user);

if (!user) {
  return res.status(401).json({ error: "Credenciales incorrectas" });
}

console.log("PASSWORD INGRESADA:", password);
console.log("PASSWORD DB:", user.password);

const isMatch = await bcrypt.compare(password, user.password);
console.log("¿COINCIDEN?:", isMatch);

if (!isMatch) {
  return res.status(401).json({ error: "Credenciales incorrectas" });
}

    const payload = { id: user._id.toString(), email: user.email, rol: user.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: rol || "cliente"
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: nuevoUsuario
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { login, getMe, register };