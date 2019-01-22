const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Users = function (url) {
  this.url = url;
  this.users = [];
};

Users.prototype.bindEvents = function(){
  PubSub.subscribe('UserFormView:user-submitted', (event) => {
    let newUser = event.detail;
    const userNames = this.users.map((user) => {
      return user.name
    })
    // console.log('user array:', userNames);
    // console.log('new user:', newUser.name);
    if (!userNames.includes(newUser.name)) {
      this.postUser(event.detail);
      // console.log('this does not match');
    } else {
      console.log('this user matches', newUser.name);
      const updatedUser = this.addToUser(newUser.name);
      this.updateUser(updatedUser);
    }

  })
};

Users.prototype.displayUsers = function(){
  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    this.getData();
  })
};

Users.prototype.getData = function(){
  const request = new Request(this.url);
  request.get()
  .then((users) => {
    this.users = users
    this.publishUsers(users);
  })
  .catch(console.error);
};

Users.prototype.postUser = function (user) {
  const request = new Request(this.url);
  request.post(user)
  .then((users) => {
    this.publishUsers(users);
  })
  .catch(console.error);
};

Users.prototype.updateUser = function(user) {
  console.log('user id:', user._id);
  const request = new Request(this.url);
  const userObject = { name: user.name, gamesCompleted: user.gamesCompleted, score: user.score }
  request.put(user._id, userObject)
  .then((users) => {
    PubSub.publish('Users:all-updated-users-loaded', users)
  })
  .catch(console.error);
};

Users.prototype.addToUser = function(userName) {
  const foundUser = this.users.find((user) => {
    return user.name === userName;
  })
  foundUser.gamesCompleted += 1;
  foundUser.score += 10;
  console.log('user', foundUser);
  return foundUser

}

Users.prototype.publishUsers = function(users){
  PubSub.publish('Users:all-users-loaded', users)
  // console.log('published on all-users-loaded in model:', users);
}

module.exports = Users;
