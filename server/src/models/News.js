var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var newsSchema = mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
  /*
  createdBy: {
    type: ObjectId,
    ref: 'users'
  },
  comments: [{
    type: ObjectId,
    ref: 'comments'
  }]
  */
});

newsSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

module.exports = mongoose.model('news', newsSchema);