const express = require("express");
const router = express.Router();
const bannerController = require("./banner.controller");

// GET
router.get("/", bannerController.get);
router.get("/distinct", bannerController.distinct);
router.get("/count", bannerController.count);
router.get("/one", bannerController.getOne);
router.get("/:id", bannerController.getById);

// POST
router.post("/", bannerController.create);
router.post("/many", bannerController.createMany);

// PUT
router.put("/:id", bannerController.update);

// DELETE
router.delete("/:id", bannerController.remove);

module.exports = router;
