var Repository = require('../repositories/BaseRepository');
var Schema = require('../models/News');

var NewsService = function(){

  var repo = new Repository(Schema);

  var create = function (e) {
    // Update news with loged in user

    return repo.create(e);
  };

  var read = function (id) {
    return repo.read(id);
  };

  var readAll = function () {
    return repo.readAll();
  };

  var update = function (e) {
    return repo.update(e);
  };

  var destroy = function (id) {
    return repo.destroy(id);
  };

  return {
    create: create,
    read: read,
    readAll: readAll,
    update: update,
    destroy: destroy
  };

};

module.exports = NewsService;