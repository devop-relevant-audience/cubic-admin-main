const express = require("express");
const router = express.Router();
const inquiryController = require("./inquiry.controller");

// GET
router.get("/", inquiryController.get);
router.get("/distinct", inquiryController.distinct);
router.get("/count", inquiryController.count);
router.get("/one", inquiryController.getOne);
router.get("/:id", inquiryController.getById);

// POST
router.post("/", inquiryController.create);
router.post("/many", inquiryController.createMany);

// PUT
router.put("/:id", inquiryController.update);

// DELETE
router.delete("/:id", inquiryController.remove);

module.exports = router;
