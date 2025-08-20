const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
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
    address: {
      type: String,
      enum: [
        'Greater Accra',
        'Ashanti',
        'Northern',
        'Volta',
        'Western',
        'Eastern',
        'Central',
        'Western North',
        'Bono',
        'Bono East',
        'Oti',
        'Upper East',
        'Upper West',
        'Savanna',
        'North East',
        'Ahafo',
      ],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reportSchema.index({ location: '2dsphere' });

reportSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
