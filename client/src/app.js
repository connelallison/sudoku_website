const SudokoGridView = require('./views/game_view');


document.addEventListener("DOMContentLoaded", function(event) {
  const sud = document.getElementById("sud");

  new SudokoGridView(sud);
});
