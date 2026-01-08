const express = require("express");
const router = express.Router();
const trainerController = require("./trainer.controller");

// GET
router.get("/", trainerController.get);
router.get("/gettag", trainerController.getPoularTag);
router.get("/distinct", trainerController.distinct);
router.get("/count", trainerController.count);
router.get("/one", trainerController.getOne);
router.get("/:id", trainerController.getById);

// POST
router.post("/", trainerController.create);
router.post("/many", trainerController.createMany);

// PUT
router.put("/:id", trainerController.update);

// DELETE
router.delete("/:id", trainerController.remove);

module.exports = router;
