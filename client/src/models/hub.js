const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Hub = function (){
  this.sudukoData = [];
};

Hub.prototype.getData = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1');
  request.get().then((data) => {
    this.sudukoData = data;
    console.log('suduko data received', data);
    PubSub.publish('Hub:suduko-data-received', this. sudukoData);
  });
}

module.exports = Hub;
