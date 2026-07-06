
const express = require("express");
const router = express.Router();

const { getUser, getUsername } = require("../controllers/user");
const { getAllContacts, getSingleContact } = require("../controllers/contacts");

router.get("/", getAllContacts);
router.get("/users/:id", getUser);
router.get("/users/:id/username", getUsername);
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getSingleContact);

module.exports = router;