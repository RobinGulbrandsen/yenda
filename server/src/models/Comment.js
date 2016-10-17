var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var commentSchema = mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

commentSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

module.exports = mongoose.model('comments', commentSchema);