// ============================================================
// routes/orders.js
// Endpoints protegidos para pedidos
// ============================================================
const express = require("express");
const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/ordersController");
const validate = require("../middleware/validate");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

const ESTADOS_VALIDOS = ["Pendiente", "En tránsito", "Entregado", "Cancelado"];

const orderRules = [
  body("origen")
    .trim()
    .notEmpty().withMessage("El origen es obligatorio")
    .isLength({ min: 3, max: 100 }).withMessage("Origen: 3-100 caracteres"),

  body("destino")
    .trim()
    .notEmpty().withMessage("El destino es obligatorio")
    .isLength({ min: 3, max: 100 }).withMessage("Destino: 3-100 caracteres")
    .custom((val, { req }) => {
      if (val.toLowerCase() === (req.body.origen || "").toLowerCase()) {
        throw new Error("El destino no puede ser igual al origen");
      }
      return true;
    }),

  body("cliente")
    .trim()
    .notEmpty().withMessage("El cliente es obligatorio")
    .isLength({ min: 2, max: 100 }).withMessage("Cliente: 2-100 caracteres"),

  body("descripcion")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({ min: 5, max: 300 }).withMessage("Descripción: 5-300 caracteres"),

  body("estado")
    .optional()
    .isIn(ESTADOS_VALIDOS)
    .withMessage(`Estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`),
];

const estadoRule = [
  body("estado")
    .notEmpty().withMessage("El estado es obligatorio")
    .isIn(ESTADOS_VALIDOS)
    .withMessage(`Estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`),
];

const idRule = [
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("El ID debe ser un ObjectId válido"),
];

router.get("/", listOrders);
router.get("/:id", idRule, validate, getOrder);
router.post("/", orderRules, validate, createOrder);
router.put("/:id", [...idRule, ...orderRules], validate, updateOrder);
router.patch("/:id/estado", [...idRule, ...estadoRule], validate, updateOrderStatus);
router.delete("/:id", idRule, validate, requireRole("admin"), deleteOrder);

module.exports = { router, idRule };
