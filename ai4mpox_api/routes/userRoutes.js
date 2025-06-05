const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Auth Controls
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware instead of doing it in each line
// router.use(authController.protect);

router.patch('/updateMyPassword',authController.protect, authController.updatePassword);
router.get('/me',authController.protect,  userController.getMe, userController.getSingleUser);
router.patch('/updateMe',authController.protect,  userController.updateMe);
router.delete('/deleteMe',authController.protect,  userController.deleteMe);

// Global Routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(authController.protect, userController.addNewUser);

// router.use(authController.restrictTo('admin', 'superadmin'));

router
  .route('/:id')
  .get(userController.getSingleUser)
  .patch(authController.protect,authController.restrictTo('admin', 'superadmin'),  userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin', 'superadmin'), userController.deleteUser);

module.exports = router;
