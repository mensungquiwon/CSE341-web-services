
const express = require("express");
const router = express.Router();

const { getUser, getUsername } = require("../controllers/user");
const { getAllContacts, getSingleContact, createContact, updateContact, deleteContact } = require("../controllers/contacts");

router.get("/", getAllContacts);
router.get("/users/:id", getUser);
router.get("/users/:id/username", getUsername);
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getSingleContact);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);  

module.exports = router;