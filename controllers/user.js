const { getDb } = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getUser = async (req, res) => {
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.db('cse341').collection('user').findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsername = async (req, res) => {
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.db('cse341').collection('user').findOne(
      { _id: userId },
      { projection: { username: 1, _id: 0 } }
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUser,
  getUsername
};