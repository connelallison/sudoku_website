const UserView = function (container) {
  this.container = container;
}

UserView.prototype.renderUser = function (user) {
  const userContainer = document.createElement('div');
  userContainer.id = 'user';

  const name = document.createElement('h3');
  name.textContent = user.name;
  userContainer.appendChild(name);

  const games = document.createElement('p');
  games.textContent = `Games Completed: ${user.gamesCompleted}`;
  userContainer.appendChild(games);

  const score = document.createElement('p');
  score.textContent = `Score: ${user.score}`;
  userContainer.appendChild(score);

  this.container.appendChild(userContainer);
}

module.exports = UserView;
