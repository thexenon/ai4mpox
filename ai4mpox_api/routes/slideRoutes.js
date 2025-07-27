const express = require('express');
const slideController = require('../controllers/slideController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(slideController.getAllSlide)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    slideController.addNewSlide,
  );

router
  .route('/:id')
  .get(slideController.getSingleSlide)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    slideController.updateSlide,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    slideController.deleteSlide,
  );

module.exports = router;
