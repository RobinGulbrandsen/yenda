var HttpStatus = require('./HttpStatus');
var UserService = require('../services/UserService');

module.exports = {
  login: function (req, res) {
    //Validate user
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      return HttpStatus.BAD_REQUEST(res);
    }

    new UserService().login(req.body)
    .then(function(result) {
      return res.status(200).send(result);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  signup: function(req, res) {
    //Validate user
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      return HttpStatus.BAD_REQUEST(res);
    }

    new UserService().signup(req.body)
    .then(function(result) {
      return res.status(200).send(result);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  },

  readAll: function (req, res) {
    new UserService().readAll().then(function(users) {
      return res.status(200).send(users);
    }).catch(function(error) {
      return HttpStatus.INTERNAL_SERVER_ERROR(res, error);
    });
  }
};