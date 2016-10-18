var Repository = require('../repositories/UserRepository');
var jwt = require('jwt-simple');
var Schema = require('../models/User');

var UserService = function(){

  var repo = new Repository(Schema);

  var login = function(user) {
    return repo.findUser(user).then(function(foundUser) {
      if (!foundUser) {
        return Promise.reject({
          'status': 400,
          'message': 'invalid username or password'
        });
      }

      return foundUser.comparePasswords(user.password).then(function(passwordMatch){
        if (!passwordMatch) {
          return Promise.reject({
          'status': 400,
          'message': 'invalid username or password'
          });
        }

        var authenticated = {
          token: jwt.encode(foundUser, 'secret'),
          user: foundUser
        };
        return Promise.resolve(authenticated);
      });
      
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  };

  var signup = function(user) {
    return repo.findUser(user).then(function(foundUser) {
      if (foundUser) {
        return Promise.reject({
          'status': 400,
          'message': 'User already exists'
        });
      }

      return repo.create(user);
    }).then(function(user) {
      user.token = jwt.encode(user, 'secret');
      return Promise.resolve(user);
    });
  };

  var readAll = function () {
    return repo.readAll();
  };

  var checkAuth = function(token, roles) {
    roles = roles || [];
    return new Promise(function(resolve, reject) {
      if(!token) {
        reject({
          'status': 401,
          'message': 'You are unauthorized'
        });
      }

      var user = jwt.decode(token, 'secret');
      
      return repo.findUser(user).then(function(foundUser) {
        if (foundUser) {
          if (roles.indexOf(foundUser.role) > -1) {
            resolve(true);
          } else {
            reject({
             'status': 401,
              'message': 'You are unauthorized'
            });
          }
        } else {
        }
      });
    });
  };

  return {
    login: login,
    signup: signup,
    checkAuth: checkAuth,

    readAll: readAll
  };

};

module.exports = UserService;