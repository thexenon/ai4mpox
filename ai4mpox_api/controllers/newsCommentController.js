const NewsComment = require('../models/newsCommentModel');
const factory = require('./handlerFactory');

exports.setNewsUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.newsmessage) req.body.newsmessage = req.params.NewsId;
  if (!req.body.sender) req.body.sender = req.user.id;
  next();
};

exports.getAllNewsComments = factory.getAll(NewsComment);
exports.getNewsComment = factory.getOne(NewsComment);
exports.createNewsComment = factory.createOne(NewsComment);
exports.updateNewsComment = factory.updateOne(NewsComment);
exports.deleteNewsComment = factory.deleteOne(NewsComment);
