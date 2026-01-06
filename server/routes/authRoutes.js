const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/ik-auth", authController.getIKAuth);


module.exports = router;