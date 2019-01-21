
const Stopwatch = function(container){
  this.container = container
}

Stopwatch.prototype.bindEvents = function(){
  const stopwatch = document.querySelector("stopwatchContainer");
  stopwatch.addEventListener('click', (event) => {
    console.log('click', event.detail)
  })
}
