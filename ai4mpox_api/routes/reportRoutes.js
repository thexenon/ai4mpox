const express = require('express');
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(reportController.getAllReport)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    reportController.addNewReport,
  );

router
  .route('/:id')
  .get(reportController.getSingleReport)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    reportController.updateReport,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    reportController.deleteReport,
  );

module.exports = router;
