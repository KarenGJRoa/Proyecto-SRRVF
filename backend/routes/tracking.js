// Alias solicitado por la consigna: /api/tracking para consultar pedidos.
const express = require("express");

const { listOrders, getOrder } = require("../controllers/ordersController");
const { idRule } = require("./orders");
const validate = require("../middleware/validate");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);
router.get("/", listOrders);
router.get("/:id", idRule, validate, getOrder);

module.exports = { router };
