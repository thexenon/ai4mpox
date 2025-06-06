const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed', 'other'],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    diseaseStatus: {
      type: String,
      enum: ['suspected', 'confirmed', 'recovered', 'deceased', 'other'],
      required: true,
      default: 'suspected',
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

reportSchema.index({ location: '2dsphere' });

reportSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
