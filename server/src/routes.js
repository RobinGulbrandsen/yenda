var NewsController = require('./controllers/NewsController');
var UserController = require('./controllers/UserController');

module.exports = function (app, express) {

  ////////// NEWS //////////////
  app.get('/api/news',          NewsController.readAll);
  app.get('/api/news/:id',      NewsController.read);
  app.post('/api/news',         NewsController.create);
  app.put('/api/news',          NewsController.update);
  app.delete('/api/news/:id',   NewsController.destroy);

  ///////// USERS //////////////
  app.post('/api/users/login',  UserController.login);
  app.post('/api/users/signup', UserController.signup);

  app.get('/api/users',         UserController.readAll);

};