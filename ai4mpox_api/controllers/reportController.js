const Report = require('../models/reportModel');
const factory = require('./handlerFactory');

exports.deleteReport = factory.deleteOne(Report);
exports.getAllReport = factory.getAll(Report);
exports.getSingleReport = factory.getOne(Report);
exports.addNewReport = factory.createOne(Report);
exports.updateReport = factory.updateOne(Report);
