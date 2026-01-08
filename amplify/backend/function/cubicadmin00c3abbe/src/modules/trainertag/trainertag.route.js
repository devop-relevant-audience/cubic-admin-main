const express = require("express");
const router = express.Router();
const trainertagController = require("./trainertag.controller");

// GET
router.get("/", trainertagController.get);
router.get("/distinct", trainertagController.distinct);
router.get("/count", trainertagController.count);
router.get("/one", trainertagController.getOne);
router.get("/:id", trainertagController.getById);

// POST
router.post("/", trainertagController.create);
router.post("/many", trainertagController.createMany);

// PUT
router.put("/:id", trainertagController.update);

// DELETE
router.delete("/:id", trainertagController.remove);

module.exports = router;
