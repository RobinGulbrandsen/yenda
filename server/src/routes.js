var NewsController = require('./controllers/NewsController');

module.exports = function (app, express) {

  ////////// NEWS //////////////
  app.get('/news',          NewsController.readAll);
  app.get('/news/:id',      NewsController.read);
  app.post('/news',         NewsController.create);
  app.put('/news',          NewsController.update);
  app.delete('/news/:id',   NewsController.destroy);

  ///////// USERS //////////////

};