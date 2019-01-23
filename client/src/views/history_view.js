const HistoryView = function(container) {
  this.container = container;
}

HistoryView.prototype.showHistory = function() {
  const historyNavButton = document.querySelector("a[href='#history']");
  historyNavButton.addEventListener('click', (event) => {
    // const formElement = document.querySelector('#new-users');
    // formElement.innerHTML = '';
    // const gridElement = document.querySelector('#users');
    // gridElement.innerHTML = '';
    this.container.innerHTML = '';
    this.renderHistoryData();
  })
}

HistoryView.prototype.renderHistoryData = function() {
  const historyHeading = document.createElement('h1');
  historyHeading.textContent = 'Sudoku History';
  this.container.appendChild(historyHeading);

  const historyInfo = document.createElement('p');
  historyInfo.textContent = "The long and interesting history of the Sudoku is quite a puzzle in itself. The name Sudoku or more correctly 数独 comes from Japan and consists of the Japanese characters Su (meaning 'number') and Doku (meaning 'single') but the was not invented in Japan. Sudoku originated in Switzerland and then traveled to Japan by way of America. Sudoku has its deep roots in ancient number puzzles. For many centuries people have been interested in creating and solving them. Puzzles continue to stimulate new development in mathematics, as you can see in the film A Beautiful Mind."
  this.container.appendChild(historyInfo);
}

module.exports = HistoryView;
