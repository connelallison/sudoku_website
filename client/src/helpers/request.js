const Request = function (url) {
  this.url = url
};

Request.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then(response => response.json());
};

module.exports = Request;
