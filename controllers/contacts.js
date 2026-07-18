const { getDb } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const response = await db.db('cse341').collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const response = await db.db('cse341').collection('contacts').findOne({ _id: contactId });
    if (!response) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const db = getDb();
    
    // 1. Debug log: Ensure the body data is actually reaching the controller
    console.log("Incoming Request Body:", req.body);

    const contactInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    
    const response = await db.db('cse341').collection('contacts').insertOne(contactInfo);
    
    // 2. Debug log: See what MongoDB returned
    console.log("MongoDB Insert Response:", response);
    
    // Fallback check to ensure we send something back if acknowledged is missing
    if (response && (response.acknowledged || response.insertedId)) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Database did not acknowledge the insertion.' });
    }
  } catch (err) {
    // 3. Debug log: Catch any database connection or validation errors
    console.error("Error in createContact:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = getDb();
    const result = await db.db('cse341').collection('contacts').replaceOne(
      { _id: contactId },
      updatedContact
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while updating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = getDb();
    const result = await db.db('cse341').collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ error: 'Some error occurred while deleting the contact.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};