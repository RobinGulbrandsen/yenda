var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    ref: 'roles',
    default: 'Admin'
  }
});

userSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.salt;
    delete ret.password;
  }
};

userSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return new Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

userSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('users', userSchema);
