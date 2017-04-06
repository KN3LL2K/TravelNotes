var request = require('superagent');

const apiURL = 'https://young-beyond-8772.herokuapp.com';

module.exports.userLogin = function(name) {
  var promise = new Promise(function(resolve, reject) {
    request
      .post(apiURL + '/auth')
      .send({name: name})
      .withCredentials()
      .then(function(res) {
        resolve(res.body)
        reject(res);
      })
  })
  return promise;
}

module.exports.getTravelers = function(auth) {
  var promise = new Promise(function(resolve, reject) {
    request
      .get(apiURL + '/travelers')
      .set({Authorization: 'Token token=' + auth})
      .withCredentials()
      .then(function(res) {
        resolve(res.body);
        reject(res);
      })
  })
  return promise
}

module.exports.updateData = function(auth, id, data) {
  var promise = new Promise(function(resolve, reject) {
    request
      .patch(apiURL + '/travelers/' + id)
      .set({Authorization: 'Token token=' + auth})
      .send({destinations: data})
      .withCredentials()
      .then(function(res) {
        resolve(res.body);
        reject(res);
      })
  })
  return promise
}
