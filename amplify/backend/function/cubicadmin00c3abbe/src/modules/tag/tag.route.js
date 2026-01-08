const express = require("express");
const router = express.Router();
const tagController = require("./tag.controller");

// GET
router.get("/", tagController.get);
router.get("/distinct", tagController.distinct);
router.get("/count", tagController.count);
router.get("/one", tagController.getOne);
router.get("/:id", tagController.getById);

// POST
router.post("/", tagController.create);
router.post("/many", tagController.createMany);

// PUT
router.put("/:id", tagController.update);

// DELETE
router.delete("/:id", tagController.remove);

module.exports = router;
