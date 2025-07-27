const Slide = require('../models/slideModel');
const factory = require('./handlerFactory');

exports.deleteSlide = factory.deleteOne(Slide);
exports.getAllSlide = factory.getAll(Slide);
exports.getSingleSlide = factory.getOne(Slide);
exports.addNewSlide = factory.createOne(Slide);
exports.updateSlide = factory.updateOne(Slide);
