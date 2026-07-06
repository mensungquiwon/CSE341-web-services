const { getDb } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.db('cse341').collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.db('cse341').collection('contacts').findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};