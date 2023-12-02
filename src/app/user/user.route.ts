import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// router to post a user
router.post('/api/users', userController.createUser);

// router to get all user
router.get('/api/users', userController.getAllUsers);

// router to get a user
router.get('/api/users/:userId', userController.getUser);

// router to update a user
router.put('/api/users/:userId', userController.updateUser);

// router to delete a user
router.delete('/api/users/:userId', userController.deleteUser);

// router to add a order
router.put('/api/users/:userId/orders', userController.addUserOrder);

// router to get all orders of a user
router.get('/api/users/:userId/orders', userController.getUserAllOrders);

// router to post a user
router.get(
  '/api/users/:userId/orders/total-price',
  userController.getUserAllOrdersTotalPrice,
);

// exporting the router
export const userRoutes = router;
