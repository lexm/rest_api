'use strict';
var mongoose = require('mongoose');

module.exports = (router, models) => {
  var jwt = require('jsonwebtoken');
  var basicHTTP = require(__dirname + '/../lib/basic_http');
  var User = models.User;
  router.post('/', basicHTTP, (req, res) => {

    // console.log(req.headers);
    // var authorizationArray = req.headers.authorization.split(' ');
    // var method = authorizationArray[0];
    // var base64ed = authorizationArray[1];
    // var authArray = new Buffer(base64ed, 'base64').toString().split(':');
    // var name = authArray[0];
    // var password = authArray[1];
    User.find({'name': req.basicHTTP.name}, function(err, user) {
      if (err) {
        return res.json({status: 'error'});
      }
      var valid = (!!user.length && user[0].compareHash(req.basicHTTP.password));
      if(!valid) {
        return res.json({status: 'failure', basicHTTP: req.basicHTTP});
      }
      var newToken = user[0].generateToken();
      res.json({token: newToken});
    });
  });
}
