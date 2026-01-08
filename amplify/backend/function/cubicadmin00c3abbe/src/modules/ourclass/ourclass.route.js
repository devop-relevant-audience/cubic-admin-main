const express = require("express");
const router = express.Router();
const ourclassController = require("./ourclass.controller");

// GET
router.get("/", ourclassController.get);
router.get("/distinct", ourclassController.distinct);
router.get("/count", ourclassController.count);
router.get("/one", ourclassController.getOne);
router.get("/:id", ourclassController.getById);

// POST
router.post("/", ourclassController.create);
router.post("/many", ourclassController.createMany);

// PUT
router.put("/:id", ourclassController.update);

// DELETE
router.delete("/:id", ourclassController.remove);

module.exports = router;
