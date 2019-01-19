// created for testing routes in insomnia

use sudoku_app;
db.dropDatabase();

db.users.insertMany([
  {
    name: "Ally",
    gamesCompleted: 5,
    score: 50
  },
  {
    name: "Kev",
    gamesCompleted: 4,
    score: 40
  },
  {
    name: "Daniel",
    gamesCompleted: 3,
    score: 30
  },
  {
    name: "Connel",
    gamesCompleted: 3,
    score: 30
  }
]);
