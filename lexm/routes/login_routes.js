'use strict';
var mongoose = require('mongoose');

module.exports = (router, models) => {
  var jwt = require('jsonwebtoken');
  var User = models.User;
  router.post('/', (req, res) => {
    console.log(req.headers);
    var authorizationArray = req.headers.authorization.split(' ');
    var method = authorizationArray[0];
    var base64ed = authorizationArray[1];
    var authArray = new Buffer(base64ed, 'base64').toString().split(':');
    var name = authArray[0];
    var password = authArray[1];
    User.find({'name': name}, function(err, user) {
      if (err) {
        return res.json({status: 'error'});
      }
      var valid = (!!user.length && user[0].compareHash(password));
      if(!valid) {
        return res.json({status: 'failure', user: user, name: name, authArray: authArray, password: password});
      }
      var newToken = user[0].generateToken();
      res.json({token: newToken});
    });
  });
}
