const PubSub = require('../helpers/pub_sub.js');

const UserFormView = function(container) {
  this.container = container;
}


UserFormView.prototype.bindEvents = function(){
  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    const sudokuElement = document.querySelector('#wrapper');
    sudokuElement.innerHTML = '';
    this.container.innerHTML = '';
    this.renderForm();
    const newUserForm = document.querySelector('#new-user-form');
    newUserForm.addEventListener('submit', (event) => {
      this.handleSubmit(event);
    })
  })
};

UserFormView.prototype.handleSubmit = function(event) {
  event.preventDefault();
  const newUser = this.createUser(event.target);
  PubSub.publish('UserFormView:user-submitted', newUser);
  console.log('UserFormView:user-submitted', newUser);
  event.target.reset();
};

UserFormView.prototype.createUser = function(form) {
  const newUser = {
    name: form.user_name.value,
    gamesCompleted: 1,
    score: 10
  }
  return newUser;
};

UserFormView.prototype.renderForm = function(){

  const formHeading = document.createElement('h2');
  formHeading.textContent = "Save your progress here!";
  this.container.appendChild(formHeading);

  const newUserForm = document.createElement('form');
  newUserForm.id = 'new-user-form';

  const nameInputLabel = document.createElement('label');
  nameInputLabel.for = 'user_name';
  nameInputLabel.innerText = 'Enter your name here:'
  newUserForm.appendChild(nameInputLabel);
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'user_name';
  newUserForm.appendChild(nameInput);

  const submitFormButton = document.createElement('input');
  submitFormButton.type = 'submit';
  submitFormButton.value = 'submit';
  submitFormButton.id = 'new-user-form-button';
  newUserForm.appendChild(submitFormButton);

  this.container.appendChild(newUserForm);

}


module.exports = UserFormView;
