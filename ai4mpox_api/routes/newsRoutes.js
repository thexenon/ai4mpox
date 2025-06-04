const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');
const newsCommentRouter = require('./newsCommentRoutes');

const router = express.Router();

router.use('/:NewsId/comments', newsCommentRouter);

router
  .route('/:NewsId/reactions')
  .patch(authController.protect, newsController.updateNewsReaction);

router
  .route('/:NewsId/commentors')
  .patch(authController.protect, newsController.updateCommentors);

router
  .route('/')
  .get(newsController.getAllNews)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    newsController.setUserIds,
    newsController.addNewNews,
  );

router
  .route('/:id')
  .get(newsController.getSingleNews)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    newsController.updateNews,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    newsController.deleteNews,
  );

module.exports = router;
