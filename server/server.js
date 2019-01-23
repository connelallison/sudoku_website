const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('sudoku_app');
  const puzzleCollection = db.collection('puzzles');
  const puzzleRouter = createRouter(puzzleCollection);
  app.use('/api/puzzles', puzzleRouter);
})
.catch(console.error);

app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port}`);
});
