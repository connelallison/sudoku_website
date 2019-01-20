const Hub = require('./models/hub.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

  const hub = new Hub();
  hub.bindEvents();
  hub.getData();
})
