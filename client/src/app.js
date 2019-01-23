const Hub = require('./models/hub.js');
const Sudoku = require('./models/sudoku_solver.js');
const SudokuValuesView = require("./views/sudoku_values_view.js");
const SudokuCandidatesView = require("./views/sudoku_candidates_view.js");
const PubSub = require('./helpers/pub_sub.js');
// const UserFormView = require('./views/user_form_view.js');
const PuzzleGridView = require('./views/puzzle_grid_view.js');
const Users = require('./models/users_model.js');
const HistoryView = require('./views/history_view.js');
const RulesView = require('./views/rules_view.js');
const GameView = require('./views/game_view.js');
const Stopwatch = require("./views/stopwatch.js");


document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

  const body = document.querySelector("body");
  body.innerHTML += `<audio id="audio" controls> <source src="./music/music.mp3" type="audio/mp3"> </audio>`;
  // // temporary code for passing a hardcoded sudoku to the view - will be replaced later.
  //   const sudoku = new Sudoku();
  //   const sudokuRows = [
  //     [0, 0, 2, 9, 8, 0, 5, 0, 0],
  //     [4, 0, 0, 0, 7, 0, 0, 1, 3],
  //     [0, 3, 9, 6, 0, 4, 0, 7, 0],
  //     [2, 0, 0, 0, 5, 6, 4, 0, 0],
  //     [8, 4, 0, 3, 0, 0, 2, 0, 1],
  //     [9, 0, 7, 0, 0, 1, 0, 8, 6],
  //     [6, 0, 0, 7, 0, 5, 1, 3, 0],
  //     [0, 9, 1, 4, 0, 0, 0, 0, 5],
  //     [0, 2, 0, 0, 3, 0, 6, 0, 8]
  //   ];
  // sudoku.populate2dArray(sudokuRows);
  // let sudokuValues = sudoku.unitsNumbers(sudoku.rows);
  // let sudokuCandidates = sudoku.unitsCandidates(sudoku.rows);  const historyInfoContainer = document.querySelector('div#wrapper');
  const wrapperContainer = document.querySelector("div#wrapper")
  const historyView = new HistoryView(wrapperContainer);
  historyView.showHistory();
  const rulesView = new RulesView(wrapperContainer);
  rulesView.showRules();
  const gameView = new GameView(wrapperContainer);
  gameView.showGame();

  // const userFormContainer = document.querySelector('div#new-users');
  // const userFormView = new UserFormView(userFormContainer);
  // // userFormView.showUserForm();
  // userFormView.bindEvents();

  const puzzleGridContainer = document.querySelector('div#wrapper');
  const puzzleGridView = new PuzzleGridView(puzzleGridContainer);
  puzzleGridView.bindEvents();

  // const usersUrl = 'http://localhost:3000/api/puzzles';
  // const users = new Users(usersUrl);
  // users.getData();
  const stopwatchContainer = document.querySelector("#stopwatch-container");
  const stopwatch = new Stopwatch(stopwatchContainer);
  stopwatch.bindEvents();

  // const switchViewButton = document.querySelector("#switch-view-button");
  // switchViewButton.addEventListener("click", () => {
  //   if (switchViewButton.textContent === "Show Candidates") {
  //     switchViewButton.textContent = "Show Values"
  //   } else if (switchViewButton.textContent === "Show Values") {
  //     switchViewButton.textContent = "Show Candidates"
  //   }
  //   PubSub.publish("App:switch-view-clicked", )
  // })

  // const sudokuGridDiv = document.querySelector("#sudoku-grid-div")
  // const sudokuValuesView = new SudokuValuesView(sudokuGridDiv);
  // sudokuValuesView.bindEvents();
  // // sudokuValuesView.render(sudokuValues);
  // const sudokuCandidatesView = new SudokuCandidatesView(sudokuGridDiv);
  // sudokuCandidatesView.bindEvents();
  //
  // const stopwatchContainer = document.querySelector("#stopwatch-container");
  // const stopwatch = new Stopwatch(stopwatchContainer);
  // stopwatch.bindEvents();
  // sudokuCandidatesView.render(sudokuCandidates);

  function swapStyleSheet(sheet) {
    document.querySelector('#pagestyle').setAttribute("href", sheet);
  }
  const audio = document.getElementById("audio");
  audio.loop = true;
  let playing = false;
  const krazyButton = document.querySelector('#krazy-button');
  let img;
  krazyButton.addEventListener('click', () => {
    const stylesheet = document.querySelector('#pagestyle');
    if (stylesheet.getAttribute('href') === './css/style.css'){
      swapStyleSheet('/css/krazy.css');
      img = document.createElement('img');
      img.src = '/images/doge.png';
      img.className = 'doge';
      const dogeDiv = document.querySelector('#doge')
      dogeDiv.appendChild(img);
    }
    else
    {
      swapStyleSheet('./css/style.css');
      img.src = '';
    };
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    audio.onplaying = function() {
      playing = true;
    };
    audio.onpause = function() {
      playing = false;
    };
  });








  const hub = new Hub('http://localhost:3000/api/puzzles');
  hub.bindEvents();
});
