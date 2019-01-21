const PubSub = require('../helpers/pub_sub.js');
const UserView = require('./user_view.js')

const UserGridView = function(container) {
  this.container = container;
}

UserGridView.prototype.bindEvents = function(){

  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    PubSub.subscribe('Users:all-users-loaded', (event) => {
      this.renderUserGrid(event.detail);
      console.log('published on all-users-loaded:', event.detail);
    })
  })
};

UserGridView.prototype.renderUserGrid = function(users){
  this.container.innerHTML = '';
  const userView = new UserView(this.container);
  users.forEach((user) => userView.renderUser(user));


  // const testPara = document.createElement('p');
  // testPara.textContent = "this is a test - this is where the user grid will go"
  // this.container.appendChild(testPara);
};

module.exports = UserGridView;
