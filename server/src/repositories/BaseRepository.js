/**
  Generic repository functions for basic CRUD operations.

  This object should be extended by other repository objects
  that has the need for more functions.
*/
var BaseRepository = function(Schema){

  var create = function (e) {
    return new Schema(e).save();
  };

  var read = function (id) {
    return Schema.find({_id: id}).exec();
  };

  var readAll = function () {
    return Schema.find({}).sort({createdAt: 'desc'}).exec();
  };

  var update = function (e) {
    return Schema.update({_id: e.id}, e).exec();
  };

  var destroy = function (id) {
    return Schema.find({_id: id}).remove().exec();
  };

  return {
    create: create,
    read: read,
    readAll: readAll,
    update: update,
    destroy: destroy
  };
};

module.exports = BaseRepository;