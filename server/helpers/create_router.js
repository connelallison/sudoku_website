// creating routes for index, show, post and delete

const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection.find()
    .toArray()
    .then((docs) => res.json(docs))
  });

  router.get('/:id', (req, res) => {
    const id = ObjectID(req.params.id);
    collection.findOne({_id: id})
    .then((docs) => res.json(docs));
  })

  return router;

};

module.exports = createRouter;
