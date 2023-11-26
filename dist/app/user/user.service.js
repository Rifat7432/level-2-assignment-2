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
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const deleteUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne(user);
    return result;
});
const updateUserIntoDB = (id, dataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, password, fullName, age, email, isActive, hobbies, address, } = dataToUpdate;
    const result = yield user_model_1.UserModel.updateOne({ userId: id }, {
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
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 });
    return result;
});
const getUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        orders: 1,
    });
    return result;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserFromDB,
    updateUserIntoDB,
    deleteUserIntoDB
};
