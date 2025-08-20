const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A name must be set'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'A description must be set'],
      trim: true,
    },
    title: {
      type: String,
    },
    contact: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
    },
    position: {
      type: String,
    },
    profiles: [
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

peopleSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
