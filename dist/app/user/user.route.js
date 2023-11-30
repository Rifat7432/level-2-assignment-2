"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// router to post a user
router.post('/api/users', user_controller_1.userController.createUser);
// router to get all user
router.get('/api/users', user_controller_1.userController.getAllUsers);
// router to get all orders of a user
router.get('/api/users/:userId/orders', user_controller_1.userController.getUserAllOrders);
// router to post a user
router.get('/api/users/:userId/orders/total-price', user_controller_1.userController.getUserAllOrdersTotalPrice);
// router to get a user
router.get('/api/users/:userId', user_controller_1.userController.getUser);
// router to update a user
router.put('/api/users/:userId', user_controller_1.userController.updateUser);
// router to add a order
router.put('/api/users/:userId/orders', user_controller_1.userController.addUserOrder);
// router to delete a user
router.delete('/api/users/:userId', user_controller_1.userController.deleteUser);
// exporting the router
exports.userRoutes = router;
