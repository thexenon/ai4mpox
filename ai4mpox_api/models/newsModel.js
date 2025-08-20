const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A news title must be set'],
      trim: true,
      minlength: [10, 'News title can not be less than 10 characters'],
    },
    newsmessage: {
      type: String,
      required: [true, 'A news message must be set'],
      trim: true,
      minlength: [10, 'News message can not be less than 10 characters'],
    },
    sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
    reactions: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    commentors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: String,
      },
    ],
    socials: [
      {
        type: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

newsSchema.virtual('comments', {
  ref: 'NewsComment',
  foreignField: 'newsmassage',
  localField: '_id',
});

newsSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
