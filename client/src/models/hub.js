const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Hub = function (){
  this.sudokuData = [];
};

Hub.prototype.bindEvents = function() {
  const newGameNavButton = document.querySelector("a[href='#game']");
  newGameNavButton.addEventListener('click', () => {
    this.getData();
  })
}

Hub.prototype.getData = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1');
  request.get().then((data) => {
    this.sudokuData = data.squares;
    // console.log('sudoku data received:', this.sudokuData);
    PubSub.publish('Hub:sudoku-data-received', this.sudokuData);
  });
}

module.exports = Hub;
