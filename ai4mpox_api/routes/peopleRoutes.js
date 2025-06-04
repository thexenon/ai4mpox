const express = require('express');
const peopleController = require('../controllers/peopleController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(peopleController.getAllPeople)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    peopleController.addNewPeople,
  );

router
  .route('/:id')
  .get(peopleController.getSinglePeople)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    peopleController.updatePeople,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'superadmin'),
    peopleController.deletePeople,
  );

module.exports = router;
