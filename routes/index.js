const express = require("express");
const router = express.Router();

const { getData } = require("../controllers");
const { getUser, getUsername } = require("../controllers/user");

router.get("/", getData);
router.get("/users/:id", getUser);
router.get("/users/:id/username", getUsername);

module.exports = router;