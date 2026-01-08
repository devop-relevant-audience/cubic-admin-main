const express = require("express");
const router = express.Router();
const eventController = require("./event.controller");

// GET
router.get("/", eventController.get);
router.get("/distinct", eventController.distinct);
router.get("/count", eventController.count);
router.get("/one", eventController.getOne);
router.get("/:id", eventController.getById);

// POST
router.post("/", eventController.create);
router.post("/many", eventController.createMany);

// PUT
router.put("/:id", eventController.update);

// DELETE
router.delete("/:id", eventController.remove);

module.exports = router;
