const express = require("express");
const router = express.Router();
const serviceController = require("./service.controller");

// GET
router.get("/", serviceController.get);
router.get("/distinct", serviceController.distinct);
router.get("/count", serviceController.count);
router.get("/one", serviceController.getOne);
router.get("/:id", serviceController.getById);

// POST
router.post("/", serviceController.create);
router.post("/many", serviceController.createMany);

// PUT
router.put("/:id", serviceController.update);

// DELETE
router.delete("/:id", serviceController.remove);

module.exports = router;
