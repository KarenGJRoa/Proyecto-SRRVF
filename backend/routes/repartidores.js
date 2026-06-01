// ============================================================
// routes/repartidores.js
// Endpoints protegidos para repartidores
// ============================================================
const express = require("express");
const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const {
  listRepartidores,
  getRepartidor,
  createRepartidor,
  updateRepartidor,
} = require("../controllers/repartidoresController");
const validate = require("../middleware/validate");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

const ESTADOS_REP = ["Disponible", "En ruta", "No disponible"];

const repRules = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 }).withMessage("Nombre: 2-100 caracteres"),

  body("telefono")
    .trim()
    .notEmpty().withMessage("El teléfono es obligatorio")
    .matches(/^[0-9]{7,15}$/).withMessage("Teléfono: solo dígitos, 7-15 caracteres"),

  body("placa")
    .trim()
    .notEmpty().withMessage("La placa es obligatoria")
    .matches(/^[A-Z0-9]{3}-?[0-9]{3}$/).withMessage("Formato de placa inválido (ej: ABC-123)"),

  body("estado")
    .optional()
    .isIn(ESTADOS_REP)
    .withMessage(`Estado debe ser uno de: ${ESTADOS_REP.join(", ")}`),
];

const idRule = [
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("ID inválido"),
];

router.get("/", listRepartidores);
router.get("/:id", idRule, validate, getRepartidor);
router.post("/", requireRole("admin", "supervisor"), repRules, validate, createRepartidor);
router.put("/:id", requireRole("admin", "supervisor"), [...idRule, ...repRules], validate, updateRepartidor);

module.exports = { router };
