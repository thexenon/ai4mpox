const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title must be set'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'A content must be set'],
      trim: true,
    },
    image: {
      type: String,
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

slideSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
