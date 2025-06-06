const mongoose = require('mongoose');

const newsCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    newsmessage: {
      type: mongoose.Schema.ObjectId,
      ref: 'News',
      required: [true, 'Comment must belong to a News message.'],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

newsCommentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

newsCommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'sender',
    select: 'name',
  });
  next();
});

newsCommentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const NewsComment = mongoose.model('NewsComment', newsCommentSchema);

module.exports = NewsComment;
