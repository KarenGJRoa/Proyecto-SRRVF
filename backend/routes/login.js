// Alias solicitado por la consigna: POST /api/login
const express = require("express");

const { login } = require("../controllers/authController");
const { loginRules } = require("./auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/", loginRules, validate, login);

module.exports = { router };
