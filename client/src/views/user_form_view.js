const UserFormView = function(form_container) {
  this.form_container = form_container;
}

UserFormView.prototype.bindEvents = function(){

  const usersNavButton = document.querySelector("a[href='#players']");
  usersNavButton.addEventListener('click', (event) => {
    this.renderForm();
  })

}

UserFormView.prototype.renderForm = function(){
  // const testPara = document.createElement('p');
  // testPara.textContent = "this is a test - this is where the user form will go"
  // this.form_container.appendChild(testPara);

  const newUserForm = document.createElement('form');

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



  this.form_container.appendChild(newUserForm);

}



// //create a checkbox
// var c = document.createElement("input");
// c.type = "checkbox";
// c.id = "checkbox1";
// c.name = "check1";
//
// //create a button
// var s = document.createElement("input");
// s.type = "submit";
// s.value = "Submit";
//
// // add all elements to the form
// f.appendChild(i);
// f.appendChild(c);
// f.appendChild(s);
//
// // add the form inside the body
// $("body").append(f);   //using jQuery or
// document.getElementsByTagName('body')[0].appendChild(f); //pure javascript


module.exports = UserFormView;
