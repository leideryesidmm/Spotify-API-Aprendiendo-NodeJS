const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { createUser, loginUser } = require("../controllers/auth");
const router = express.Router();

router.post("/register", validatorRegister, createUser);
router.post("/login", validatorLogin, loginUser);
module.exports = router;
