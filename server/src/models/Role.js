var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var roleSchema = mongoose.Schema({
  _id: String
});

roleSchema.virtual('role').get(function() {
  return this._id;
});

module.exports = mongoose.model('roles', roleSchema);