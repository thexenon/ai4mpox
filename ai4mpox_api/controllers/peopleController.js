const People = require('../models/peopleModel');
const factory = require('./handlerFactory');

exports.deletePeople = factory.deleteOne(People);
exports.getAllPeople = factory.getAll(People);
exports.getSinglePeople = factory.getOne(People);
exports.addNewPeople = factory.createOne(People);
exports.updatePeople = factory.updateOne(People);
