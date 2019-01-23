const PubSub = require('../helpers/pub_sub.js');
const PuzzleView = require('./puzzle_view.js')

const PuzzleGridView = function(container) {
  this.container = container;
}

PuzzleGridView.prototype.bindEvents = function(){
  PubSub.subscribe('Hub:puzzles-per-user-loaded', (event) => {
    const puzzlesNavButton = document.querySelector("a[href='#puzzles']");
    puzzlesNavButton.addEventListener('click', (evt) => {
      console.log('puzzles button pressed');
      this.renderPuzzleGrid(event.detail);
      console.log('published on puzzles-per-user-loaded:', event.detail);
    })
  })
};

PuzzleGridView.prototype.renderPuzzleGrid = function(puzzles){
  this.container.innerHTML = '';

  const puzzleView = new PuzzleView(this.container);
  puzzles.forEach((puzzle) => puzzleView.renderPuzzle(puzzle));

};

module.exports = PuzzleGridView;
