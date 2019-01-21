const Hub = require('./models/hub.js');
const SudokuPopulate = require('./models/sudoku_logic/sudoku_populate.js');
const UserFormView = require('./views/user_form_view.js');
const UserGridView = require('./views/user_grid_view.js');
const Users = require('./models/users_model.js')

document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

  const userFormContainer = document.querySelector('div#new-users');
  const userFormView = new UserFormView(userFormContainer);
  userFormView.bindEvents();

  const userGridContainer = document.querySelector('div#users');
  const userGridView = new UserGridView(userGridContainer);
  userGridView.bindEvents();

  const sudokuPopulate = new SudokuPopulate();
  sudokuPopulate.bindEventsPopulate();

  const usersUrl = 'http://localhost:3000/api/users';
  const users = new Users(usersUrl);
  users.getData();

  const hub = new Hub();
  hub.getData();
})
