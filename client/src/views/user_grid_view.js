const PubSub = require('../helpers/pub_sub.js');
const PuzzleView = require('./puzzle_view.js')

const PuzzleGridView = function(container) {
  this.container = container;
}

PuzzleGridView.prototype.bindEvents = function(){
  const puzzlesNavButton = document.querySelector("a[href='#puzzles']");
  puzzlesNavButton.addEventListener('click', (event) => {
    PubSub.subscribe('Puzzles:all-users-loaded', (event) => {
      this.renderUserGrid(event.detail);
      console.log('published on all-users-loaded:', event.detail);
    })
  })
};

UserGridView.prototype.renderUserGrid = function(users){
  const sudokuElement = document.querySelector('#wrapper');
  sudokuElement.innerHTML = '';
  const userView = new UserView(this.container);
  users.forEach((user) => userView.renderUser(user));
};

module.exports = UserGridView;
