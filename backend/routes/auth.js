// ============================================================
// routes/auth.js
// POST /api/auth/login   -> devuelve JWT
// GET  /api/auth/me      -> info del usuario autenticado
// ============================================================
const express = require("express");
const { body } = require("express-validator");

const { login, getMe } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

const loginRules = [
  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Formato de email inválido")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

const { register } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", loginRules, validate, login);
router.get("/me", verifyToken, getMe);

module.exports = { router, loginRules };
