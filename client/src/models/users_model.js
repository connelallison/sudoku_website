const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Users = function (url) {
  this.url = url;
};

Users.prototype.bindEvents = function(){

};

Users.prototype.getData = function(){
  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    const request = new Request(this.url);
    request.get()
    .then((users) => {
      this.publishUsers(users);
    })
    .catch(console.error);
  })
};

Users.prototype.publishUsers = function(users){
  PubSub.publish('Users:all-users-loaded', users)
  console.log('published on all-users-loaded in model:', users);
}

module.exports = Users;
