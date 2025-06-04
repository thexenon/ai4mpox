const News = require('../models/newsModel');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
  if (!req.body.sender) req.body.sender = req.user.id;
  next();
};

exports.deleteNews = factory.deleteOne(News);
exports.getAllNews = factory.getAll(News, { path: 'comments sender' });
exports.getSingleNews = factory.getOne(News, { path: 'comments sender' });
exports.addNewNews = factory.createOne(News);
exports.updateNews = factory.updateOne(News);
exports.updateNewsReaction = factory.updateArray(News);
exports.updateCommentors = factory.updateCommentors(News);
