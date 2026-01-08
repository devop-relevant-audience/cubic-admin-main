const express = require("express");
const router = express.Router();
const eventtagController = require("./eventtag.controller");

// GET
router.get("/", eventtagController.get);
router.get("/distinct", eventtagController.distinct);
router.get("/count", eventtagController.count);
router.get("/one", eventtagController.getOne);
router.get("/:id", eventtagController.getById);

// POST
router.post("/", eventtagController.create);
router.post("/many", eventtagController.createMany);

// PUT
router.put("/:id", eventtagController.update);

// DELETE
router.delete("/:id", eventtagController.remove);

module.exports = router;
