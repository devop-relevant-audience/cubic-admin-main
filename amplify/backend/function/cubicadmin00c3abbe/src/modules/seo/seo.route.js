const express = require("express");
const router = express.Router();
const seoController = require("./seo.controller");

// GET
router.get("/", seoController.get);
router.get("/distinct", seoController.distinct);
router.get("/count", seoController.count);
router.get("/one", seoController.getOne);
router.get("/:id", seoController.getById);

// POST
router.post("/", seoController.create);
router.post("/many", seoController.createMany);

// PUT
router.put("/:id", seoController.update);

// DELETE
router.delete("/:id", seoController.remove);

module.exports = router;
