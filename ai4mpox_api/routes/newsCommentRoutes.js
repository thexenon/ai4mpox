const express = require('express');
const newsCommentController = require('../controllers/newsCommentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(newsCommentController.getAllNewsComments)
  .post(
    authController.protect,
    newsCommentController.setNewsUserIds,
    newsCommentController.createNewsComment,
  );

router
  .route('/:id')
  .get(newsCommentController.getNewsComment)
  .patch(
    authController.protect,
    authController.restrictTo('creator', 'admin', 'superadmin'),
    newsCommentController.updateNewsComment,
  )
  .delete(
    authController.protect,
    authController.restrictTo('creator', 'admin', 'superadmin'),
    newsCommentController.deleteNewsComment,
  );

module.exports = router;
