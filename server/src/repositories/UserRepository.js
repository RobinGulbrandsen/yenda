var UserRepository = function(Schema){

  //TODO: extend BaseRepository for rooster functionality
  var findUser = function(user) {
    return Schema.findOne({username: user.username});
  };

  var create = function (e) {
    return new Schema(e).save();
  };

  var readAll = function () {
    return Schema.find({}).sort({createdAt: 'desc'}).exec();
  };

  return {
    findUser: findUser,
    create: create,
    readAll: readAll
  };
};

module.exports = UserRepository;