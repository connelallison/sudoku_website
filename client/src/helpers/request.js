<<<<<<< HEAD
const Request = function (url) {
  this.url = url
};

Request.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then(response => response.json());
};

module.exports = Request;
=======
const RequestHelper = function (url) {
  this.url = url;
};

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then((response) => response.json());
};

RequestHelper.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

RequestHelper.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

module.exports = RequestHelper;
>>>>>>> b05791afea0d5909e3110db2604ea31266075d5d
