var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var userSchema = mongoose.Schema({
  _id: String,
  password: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
    default: 'Initiate'
  }
});

userSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.username = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

userSchema.virtual('username').get(function() {
  return this._id;
});

module.exports = mongoose.model('users', userSchema);