const Hub = require('./models/hub.js');
// const SudokuPopulate = require('./models/sudoku_logic/sudoku_populate.js');
const UserFormView = require('./views/user_form_view.js');
const UserGridView = require('./views/user_grid_view.js');
const Users = require('./models/users_model.js');
const HistoryView = require('./views/history_view.js');
const RulesView = require('./views/rules_view.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

  const rulesInfoContainer = document.querySelector('div#wrapper');
  const rulesView = new RulesView(rulesInfoContainer);
  rulesView.showRules();

  const historyInfoContainer = document.querySelector('div#wrapper');
  const historyView = new HistoryView(historyInfoContainer);
  historyView.showHistory();

  const userFormContainer = document.querySelector('div#wrapper');
  const userFormView = new UserFormView(userFormContainer);
  userFormView.showUserForm();

  const userGridContainer = document.querySelector('div#wrapper');
  const userGridView = new UserGridView(userGridContainer);
  userGridView.bindEvents();

  // const sudokuPopulate = new SudokuPopulate();
  // sudokuPopulate.bindEventsPopulate();

  const usersUrl = 'http://localhost:3000/api/users';
  const users = new Users(usersUrl);
  users.getData();

  const hub = new Hub();
  hub.getData();
})
