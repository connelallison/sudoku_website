const Request = function (url) {
  this.url = url
};

// do we pass anything in here?
// Request.prototype.get = function (onComplete) {
Request.prototype.get = function () {
  return fetch(this.url, {
 mode: 'cors',
 headers: {
   "Access-Control-Allow-Headers": "access-control-allow-origin",
   "Access-Control-Allow-Methods": ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
   'Access-Control-Allow-Origin':'*',
   'Content-Type': 'text/html'
 }
})
    .then((response) => response.json());
};

Request.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

Request.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

module.exports = Request;
