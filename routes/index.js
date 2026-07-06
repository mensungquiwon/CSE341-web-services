const express = require("express");
const router = express.Router();

const { getData } = require("../controllers");
const { getUser, getUsername } = require("../controllers/user");
const { getAllContacts, getSingleContact } = require("../controllers/contacts");

router.get("/", getData);
router.get("/users/:id", getUser);
router.get("/users/:id/username", getUsername);
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getSingleContact);

module.exports = router;