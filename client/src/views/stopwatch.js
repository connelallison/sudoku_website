const PubSub = require('../helpers/pub_sub.js');

const Stopwatch = function(container){
  this.container = container
  this.status = 0;
  this.time = 0;
}

Stopwatch.prototype.populate = function () {
  this.container.innerHTML = "";
  // const title = document.createElement("h3");
  const timerLabel = document.createElement("h2");
  // title.textContent = "Stopwatch";
  timerLabel.id = "timer-label"
  // this.container.appendChild(title);
  this.container.appendChild(timerLabel);
  this.status = 1;
  this.time = 0;
  this.timer();
}




Stopwatch.prototype.timer = function () {
  const stopwatch = this;
  const status = this.status;
  if (status === 1) {
    setTimeout(function (){
      // console.log(stopwatch);
      // console.log(stopwatch.time);
      stopwatch.time++;
      let hour = Math.floor(stopwatch.time/60/60);
      let min = Math.floor(stopwatch.time/60);
      let sec = Math.floor(stopwatch.time);

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (hour === 0) {
        hour = "";
      }
      if (min >= 60) {
        min = min % 60;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (min === 0) {
        min = "";
      }
      if (sec >= 60) {
        sec = sec % 60;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }

      document.querySelector("#timer-label").innerHTML = `${hour}:${min}:${sec}`
      // console.log(hour + min + sec);
      stopwatch.timer();
    }, 1000);
  }
  return;
}


Stopwatch.prototype.bindEvents = function(){
  // stopwatch.addEventListener('click', (event) => {
  //   console.log('click', event.detail)
  // })
  PubSub.subscribe("Hub:puzzle-begins", () => {
    this.status = 0;
    const populate = this.populate;
    const boundPopulate = populate.bind(this);
    setTimeout(boundPopulate, 500);
  })
  PubSub.subscribe("Hub:puzzle-ends", () => {
    this.status = 0;
  })
}

module.exports = Stopwatch;
