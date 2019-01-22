const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Users = function (url) {
  this.url = url;
};

// Users.prototype.bindEvents = function(){
//   PubSub.subscribe('UserFormView:user-submitted', (event) => {
//     let newUser = event.detail;
//     const users = this.getData();
//     PubSub.subscribe('Users:all-users-loaded', (evt) => {
//       const allUsers = evt.detail;
//       const userNames = allUsers.map((user) => {
//         return user.name
//       });
//       console.log('user array:', userNames);
//       console.log('new user:', newUser);
//       if (userNames.includes(event.detail.name)) {
//         // infinite loop when this is uncommented!
//         // this.postGame(event.detail);
//       } else {
//         console.log('this does not match!');
//       }
//     })
//   })
// };

Users.prototype.bindEvents = function() {
  PubSub.subscribe('UserFormView:user-submitted', (event) => {
    this.postGame(event.detail);
  })
}

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
    this.publishUsers(users);
  })
  .catch(console.error);
};

Users.prototype.postGame = function (user) {
  const request = new Request(this.url);
  request.post(user)
  .then((users) => {
    this.publishUsers(users);
  })
  .catch(console.error);
};

Users.prototype.publishUsers = function(users){
  PubSub.publish('Users:all-users-loaded', users)
  console.log('published on all-users-loaded in model:', users);
}

module.exports = Users;
