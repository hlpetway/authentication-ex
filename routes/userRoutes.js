'use strict';

var User = require('../models/User');

module.exports = function(app, passport) {
  var baseUrl = app.get('apiBase') + 'users';

  app.post(baseUrl, function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if(err) {
        req.send(500, err);
        return false;
      }

      if(user) {
        res.send(401, {'msg': 'A user with that email already exists'});
        return false;
      }

      var newUser = new User({});
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);

      newUser.save(function(err, resNewUser) {
        if(err) {
          res.send(500, err);
          return false;
        }

        //res.send(resNewUser);
        res.json({'jwt_token': resNewUser.createToken(app)});
      });
    });
  });

//this assigns a token at login that will then be used until it expires
  app.get(baseUrl,
    passport.authenticate('basic', {session: false}),
    function(req, res) {
      //res.json(req.user);
      res.json({'jwt_token': req.user.createToken(app)});
    });
};
