const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Sudoku = require('./sudoku_solver.js')

const Hub = function (){
  this.url = "http://localhost:3000/api/puzzles";
  this.sudoku = new Sudoku();
  this.initialSudoku = null;
  this.displaysCandidates = false;
  this.user = null;
  this.difficulty;
};

Hub.prototype.bindEvents = function () {
  const gameNavButton = document.querySelector("a[href='#game']");
  gameNavButton.addEventListener('click', (event) => {
    PubSub.publish("Hub:render-sudoku-grid");
    PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
  })
  const userForm = document.querySelector("#current-user");
  if (localStorage.getItem("savedUser")) {
    userForm.value = localStorage.getItem("savedUser");
    this.user = userForm.value;
    console.log("loaded " + this.user);
  }
  userForm.addEventListener("change", (event) => {
    this.user = event.target.value;
    localStorage.setItem("savedUser", this.user);
    console.log(this.user);
  })

  const completionMessage = document.querySelector("#completion-message");
  const body = document.querySelector("body");
  // body.addEventListener("click", () => {
  //   completionMessage.innerHTML = "";
  // })
  PubSub.publish("Hub:render-sudoku-grid");
  PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
  PubSub.subscribe("SudokuValuesView:attempt-fill-value", (event) => {
    const row = event.detail[0];
    const column = event.detail[1];
    const square = this.sudoku.rows[row][column];
    const value = event.detail[2];
    console.log("row:", row);
    console.log("column:", column);
    console.log("value:", value);
    console.log("square:", square);
    if (this.sudoku.attemptFillValue(square, value)) {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
      console.log("value accepted, re-rendering view");
    } else {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
      // PubSub.publish("Hub:value-rejected", square.peerCoords())
      console.log("value rejected, re-rendering view");
      // PubSub.publish("Hub:illegal-move");
    }

  })
  PubSub.subscribe("GameView:easy-button-clicked", () => {
    this.getDataEasy();
  });
  PubSub.subscribe("GameView:medium-button-clicked", () => {
    this.getDataMedium();
  });
  PubSub.subscribe("GameView:hard-button-clicked", () => {
    this.getDataHard();
  });
  PubSub.subscribe("GameView:solve-button-clicked", () => {
    PubSub.publish("Hub:puzzle-ends");
    this.sudoku.solve();
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
  })
  PubSub.subscribe("GameView:switch-button-clicked", () => {
    if (this.sudoku) {
      if (this.displaysCandidates) {
        PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
        this.displaysCandidates = false;
      } else {
        PubSub.publish("Hub:render-candidates-view", this.sudoku.unitsCandidates(this.sudoku.rows));
        this.displaysCandidates = true;
      }
    }
  })
  PubSub.subscribe("Hub:puzzle-ends", () => {
    console.log("puzzle-ends triggered");
    this.puzzleEnds();
  });
}

Hub.prototype.getDataEasy = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "easy";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins");
  });
}

Hub.prototype.getDataMedium = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=2');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received medium', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "medium";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish('Hub:render-values-view',
    this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

Hub.prototype.getDataHard = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=3');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received hard', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "hard";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

Hub.prototype.puzzleEnds = function () {
  const puzzleInitial = this.initialSudoku;
  const puzzleFinal = this.sudoku.stringify();
  const puzzleUser = this.user;
  const puzzleTime = document.querySelector("#timer-label").innerHTML;
  const puzzleHelp = null;
  const puzzleDifficulty = this.difficulty;
  const gameObject = {
    user: puzzleUser,
    initial: puzzleInitial,
    final: puzzleFinal,
    time: puzzleTime,
    help: puzzleHelp,
    difficulty: puzzleDifficulty
  };
  this.postPuzzle(gameObject);
}

Hub.prototype.postPuzzle = function (puzzle) {
  const request = new Request(this.url);
  request.post(puzzle)
  .then(this.completionMessage(puzzle))
  .catch(console.error);
};

Hub.prototype.completionMessage = function (gameObject) {
  messageContainer = document.querySelector("#completion-message");
  switch (gameObject.help) {
    case "solo":
      messageContainer.innerHTML += "<p>Good job! You solved it all by yourself.</p>";
      break;
    case "hint":
      messageContainer.innerHTML += "<p>Good job! You only needed a little help.</p>";
      break;
    case "solver":
      messageContainer.innerHTML += "<p>Here's your solution!</p>";
      break;
    default:
      messageContainer.innerHTML += "<p>Logic does not yet report help.</p>";
      break;
  }
  messageContainer.innerHTML += `<p>User: ${gameObject.user}</p>`;
  messageContainer.innerHTML += `<p>Time: ${gameObject.time}</p>`;
  messageContainer.innerHTML += `<p>Difficulty: ${gameObject.difficulty}</p>`;
}

module.exports = Hub;
