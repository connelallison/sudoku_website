const RequestHelper = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Games = function () {
  this.url = 'http://www.cs.utep.edu/cheon/ws/sudoku/';
  this.request = new RequestHelper(this.url);
