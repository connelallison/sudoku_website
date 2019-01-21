const UserFormView = function(container) {
  this.container = container;
}

UserFormView.prototype.showUserForm = function(){

  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    const sudokuElement = document.querySelector('#wrapper');
    sudokuElement.innerHTML = '';
    this.renderForm();
  })

}

UserFormView.prototype.renderForm = function(){

  const newUserForm = document.createElement('form');
  newUserForm.id = 'new-user-form';

  const nameInputLabel = document.createElement('label');
  nameInputLabel.for = 'user_name';
  nameInputLabel.innerText = 'Name please!'
  newUserForm.appendChild(nameInputLabel);
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'user_name';
  newUserForm.appendChild(nameInput);



  const submitFormButton = document.createElement('input');
  submitFormButton.type = 'submit';
  submitFormButton.value = 'submit';
  newUserForm.appendChild(submitFormButton);



  this.container.appendChild(newUserForm);

}


module.exports = UserFormView;
