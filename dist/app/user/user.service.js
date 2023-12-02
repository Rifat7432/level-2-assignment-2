"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
// service function for posting user in DB
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
// service function for getting all users from DB
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({ isDeleted: false }, { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 });
    return result;
});
// service function for getting a user from DB
const getUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId, isDeleted: false }, {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return result;
});
// service function for updating user in DB
const updateUserIntoDB = (id, dataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, password, fullName, age, email, isActive, hobbies, address, } = dataToUpdate;
    const result = yield user_model_1.UserModel.updateOne({ userId: id, isDeleted: false }, {
        $set: {
            userId,
            username,
            password,
            fullName,
            age,
            email,
            isActive,
            hobbies,
            address,
        },
    });
    return result;
});
// service function for deleting user in DB
const deleteUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: id, isDeleted: false }, {
        $set: {
            isDeleted: true,
        },
    });
    return result;
});
// service function for putting user orders in DB
const addUserOrdersIntoDB = (id, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: id, isDeleted: false }, {
        $push: {
            orders: order,
        },
    });
    return result;
});
// service function for getting user's orders from DB
const getUserOrdersIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: id, isDeleted: false });
    return result;
});
// service function for getting user's orders total price in DB
const getUserOrdersTotalPriceIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: id, isDeleted: false });
    if (result !== null && result.orders) {
        const totalPrice = result.orders.reduce((totalPrice, order) => totalPrice + order.price, 0);
        return totalPrice;
    }
    else {
        return null;
    }
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserFromDB,
    updateUserIntoDB,
    deleteUserIntoDB,
    addUserOrdersIntoDB,
    getUserOrdersIntoDB,
    getUserOrdersTotalPriceIntoDB,
};
