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
          token: jwt.encode(passwordMatch, 'secret'),
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

  var checkAuth = function(token) {
    console.log('validating header', token);
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
          Promise.resolve();
        } else {
          Promise.reject();
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