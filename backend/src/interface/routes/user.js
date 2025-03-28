"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/create", controller.create);
router.get("/", controller.getAll);

module.exports = router;
