import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:userId/orders', userController.getUserAllOrders);
router.get(
  '/api/users/:userId/orders/total-price',
  userController.getUserAllOrdersTotalPrice,
);
router.get('/api/users/:userId', userController.getUser);
router.put('/api/users/:userId', userController.updateUser);
router.put('/api/users/:userId/orders', userController.addUserOrder);
router.delete('/api/users/:userId', userController.deleteUser);

export const userRoutes = router;
