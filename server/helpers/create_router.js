// creating routes for index, show, post and delete

const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

const createRouter = function (collection) {

  const router = express.Router();
  router.all("*", cors());

  router.get('/', (req, res) => {
    collection.find()
    .toArray()
    .then((docs) => res.json(docs))
  });

  router.get('/:id', (req, res) => {
    const id = ObjectID(req.params.id);
    collection.findOne({_id: id})
    .then((docs) => res.json(docs));
  });

  router.post('/', (req, res) => {
    const newUser = req.body;
    collection.insertOne(newUser)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  router.delete('/:id', (req, res) => {
    const id = ObjectID(req.params.id);
    collection.deleteOne({_id: id})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  return router;

};

module.exports = createRouter;
