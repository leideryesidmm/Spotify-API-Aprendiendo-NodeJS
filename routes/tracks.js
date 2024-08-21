const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");
const router = express.Router();

router.get("/", authMiddleware, checkRol(["admin", "user"]), getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deleteItem
);

module.exports = router;
