const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Sudoku = require('./sudoku_solver.js')

const Hub = function (url){
  this.url = url;
  let sudoku = new Sudoku();
  this.sudoku = sudoku;
  this.initialSudoku = null;
  this.displaysCandidates = false;
  this.user = null;
  this.difficulty;
  this.help = "none";
  this.time = 0;
};

Hub.prototype.bindEvents = function () {
  const puzzlesNavButton = document.querySelector("a[href='#puzzles']");
  puzzlesNavButton.addEventListener("click", (evt) => {
    this.showPuzzlesByUser();
  })
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
  this.showPuzzlesByUser();
  // const completionMessage = document.querySelector("#completion-message");
  // const body = document.querySelector("body");
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
    // console.log("row:", row);
    // console.log("column:", column);
    // console.log("value:", value);
    // console.log("square:", square);
    const result = this.sudoku.attemptFillValue(square, value);
    // console.log(result);
    if (result[0]) {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
      console.log("value accepted, re-rendering view");
    } else {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));

      PubSub.publish("Hub:value-rejected", this.sudoku.getCoordsArray(result[1]));
      console.log(this.sudoku.getCoordsArray(result[1]));
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
  // PubSub.subscribe("GameView:hard-button-clicked", () => {
  //   this.getDataHard();
  // });
  PubSub.subscribe("GameView:custom-puzzle-entered", (event) => {
    this.sudoku = new Sudoku();
    this.sudoku.populateString(event.detail);
    this.sudoku.handleUniqueness();
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "custom";
    PubSub.publish("Hub:initialise-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins");
  })
  PubSub.subscribe("GameView:check-button-clicked", () => {
    if (this.sudoku.sudokuComplete()) {
      this.time = document.querySelector("#timer-label").innerHTML;
      PubSub.publish("Hub:puzzle-ends");
      PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
      this.displaysCandidates = false;
    }
  })
  PubSub.subscribe("GameView:hint-button-clicked", () => {
    if (this.help === "none") {
      this.help = "hint";
    }
    this.sudoku.hint();
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
  })
  PubSub.subscribe("GameView:solve-button-clicked", () => {
    this.help = "solver";
    this.sudoku.solve();
    this.time = document.querySelector("#timer-label").innerHTML;
    PubSub.publish("Hub:puzzle-ends");
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
  })
  PubSub.subscribe("GameView:clear-button-clicked", () => {
    this.help = "abort";
    this.sudoku = new Sudoku();
    this.time = document.querySelector("#timer-label").innerHTML;
    PubSub.publish("Hub:puzzle-ends");
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
    document.querySelector("#stopwatch-container").innerHTML = "";
  })
  PubSub.subscribe("GameView:reset-button-clicked", () => {
    this.sudoku = new Sudoku();
    this.sudoku.populateString(this.initialSudoku);
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
  })
  PubSub.subscribe("GameView:switch-button-clicked", () => {
    if (this.sudoku) {
      if (this.displaysCandidates) {
        PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
        document.querySelector("#switch-view-button").innerHTML = "Show Candidates";
        this.displaysCandidates = false;
      } else {
        PubSub.publish("Hub:render-candidates-view", this.sudoku.unitsCandidates(this.sudoku.rows));
        document.querySelector("#switch-view-button").innerHTML = "Show Values";
        this.displaysCandidates = true;
      }
    }
  })
  PubSub.subscribe("Hub:puzzle-ends", () => {
    console.log("puzzle-ends triggered");
    this.puzzleEnds();
  });
  const messageContainer = document.querySelector("#completion-message");
  const buttons = document.querySelectorAll(".clear-message");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      messageContainer.innerHTML = "";
    })
  })
}

Hub.prototype.getDataEasy = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    this.sudoku.handleUniqueness();
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "easy";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish("Hub:initialise-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    // PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
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
    this.sudoku.handleUniqueness();
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "medium";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish("Hub:initialise-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
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
    this.sudoku.handleUniqueness();
    this.initialSudoku = this.sudoku.stringify();
    this.difficulty = "hard";
    // PubSub.publish("Hub:puzzle-ends");
    PubSub.publish("Hub:initialise-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

Hub.prototype.puzzleEnds = function () {
  const puzzleInitial = this.initialSudoku;
  const puzzleFinal = this.sudoku.stringify();
  const puzzleUser = this.user;
  const puzzleTime = this.time;
  const puzzleHelp = this.help;
  const puzzleDifficulty = this.difficulty;
  const gameObject = {
    user: puzzleUser,
    initial: puzzleInitial,
    final: puzzleFinal,
    time: puzzleTime,
    help: puzzleHelp,
    difficulty: puzzleDifficulty
  };
  console.log('initial sudoku:', puzzleInitial);
  console.log('final sudoku:', puzzleFinal);
  console.log('puzzle time:', puzzleTime);
  console.log('puzzle help:', puzzleHelp);
  console.log('difficulty:', puzzleDifficulty);
  this.postPuzzle(gameObject);

}

Hub.prototype.showPuzzlesByUser = function () {
  const user = this.user;
  const url = this.url;
  const request = new Request(this.url);
  request.show(user)
  .then((puzzles) => {
    console.log('Hub:puzzles-per-user-loaded', puzzles);
    PubSub.publish('Hub:puzzles-per-user-loaded', puzzles);
  })
  .catch(console.error);
}

Hub.prototype.postPuzzle = function (puzzle) {
  const url = this.url;
  const request = new Request(url);
  request.post(puzzle)
  .then(this.completionMessage(puzzle))
  .catch(console.error);
};

Hub.prototype.completionMessage = function (gameObject) {
  messageContainer = document.querySelector("#completion-message");
  messageContainer.innerHTML = "";
  switch (gameObject.help) {
    case "abort":
      return;
      break;
    case "none":
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
  if (this.user) {
    messageContainer.innerHTML += `<p>User: ${gameObject.user}</p>`;
  }
  messageContainer.innerHTML += `<p>Time: ${gameObject.time}</p>`;
  messageContainer.innerHTML += `<p>Difficulty: ${gameObject.difficulty}</p>`;
  // const buttons = document.querySelectorAll("button");
  // const anchors = document.querySelectorAll("a");
  // const clearMessage = () => {
  //   messageContainer.innerHTML = "";
  //   removeEventListener("click", clearMessage)
  // }
  // for (let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", clearMessage)
  // }
  // for (let i = 0; i < anchors.length; i++) {
  //   anchors[i].addEventListener("click", clearMessage)
  // }
}

module.exports = Hub;
