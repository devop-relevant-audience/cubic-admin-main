const express = require("express");
const router = express.Router();
const clubController = require("./club.controller");

// GET
router.get("/", clubController.get);
router.get("/distinct", clubController.distinct);
router.get("/count", clubController.count);
router.get("/one", clubController.getOne);
router.get("/:id", clubController.getById);

// POST
router.post("/", clubController.create);
router.post("/many", clubController.createMany);

// PUT
router.put("/:id", clubController.update);

// DELETE
router.delete("/:id", clubController.remove);

module.exports = router;
