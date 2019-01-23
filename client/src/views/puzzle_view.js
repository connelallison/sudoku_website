const PuzzleView = function (container) {
  this.container = container;
}

PuzzleView.prototype.renderPuzzle = function (puzzle) {



  const puzzleContainer = document.createElement('div');
  puzzleContainer.id = 'puzzle';

  const initialSudoku = document.createElement('p');
  initialSudoku.textContent = `Initial Sudoku: ${puzzle.initial}`;
  puzzleContainer.appendChild(initialSudoku);

  const finalSudoku = document.createElement('p');
  finalSudoku.textContent = `Completed Sudoku: ${puzzle.final}`;
  puzzleContainer.appendChild(finalSudoku);

  const time = document.createElement('p');
  time.textContent = `Time: ${puzzle.time}`;
  puzzleContainer.appendChild(time);

  const help = document.createElement('p');
  help.textContent = `Help required: ${puzzle.help}`;
  puzzleContainer.appendChild(help);

  const difficulty = document.createElement('p');
  difficulty.textContent = `Puzzle difficulty: ${puzzle.difficulty}`;
  puzzleContainer.appendChild(difficulty);

  this.container.appendChild(puzzleContainer);
}

module.exports = PuzzleView;
