const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");

router.get("/", getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  uploadMiddleware.single("myfile"),
  createItem
);
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deleteItem
);

module.exports = router;
