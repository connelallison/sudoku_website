const RulesView = function(container) {
  this.container = container;
}

RulesView.prototype.showRules = function() {
  const rulesNavButton = document.querySelector("a[href='#rules']");
  rulesNavButton.addEventListener('click', (event) => {
    // const formElement = document.querySelector('#new-users');
    // formElement.innerHTML = '';
    // const gridElement = document.querySelector('#users');
    // gridElement.innerHTML = '';
    this.container.innerHTML = '';
    this.renderRules();
  })
}

RulesView.prototype.renderRules = function() {
  const rulesHeading = document.createElement('h1');
  rulesHeading.textContent = 'Sudoku Rules';
  this.container.appendChild(rulesHeading);

  const rulesInfo = document.createElement('p');
  rulesInfo.textContent = "The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares. The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box. The difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission. Every puzzle has just one correct solution and the fewer the numers given at the start increases the difficulty level."
  this.container.appendChild(rulesInfo);
}

module.exports = RulesView;
