"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_zod_1 = __importStar(require("./user.validation.zod"));
//controller function to create a user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting user data
        const { user: UserData } = req.body;
        //validating data by zod
        const zodParsedData = user_validation_zod_1.default.parse(UserData);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        const data = yield user_service_1.userServices.getUserFromDB(result.userId.toString());
        res.status(200).json({
            success: true,
            massage: 'ser created successfully!',
            data: data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to get all user
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            massage: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to get a user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userServices.getUserFromDB(id);
        if (result) {
            res.status(200).json({
                success: true,
                massage: 'student found successfully',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        //getting user data
        const data = req.body;
        //validating data by zod
        const zodParsedData = user_validation_zod_1.default.parse(data);
        const result = yield user_service_1.userServices.updateUserIntoDB(id, zodParsedData);
        if (result.modifiedCount === 1) {
            const userData = yield user_service_1.userServices.getUserFromDB(data === null || data === void 0 ? void 0 : data.userId);
            res.status(200).json({
                success: true,
                massage: 'User updated successfully!',
                data: userData,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userServices.deleteUserIntoDB(id);
        if (result.modifiedCount === 1) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to add order into a user
const addUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        //getting user data
        const data = req.body;
        //validating data by zod
        const zodParsedData = user_validation_zod_1.OrdersZodValidation.parse(data);
        const result = yield user_service_1.userServices.addUserOrdersIntoDB(id, zodParsedData);
        if (result.modifiedCount === 1) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to get all orders of a user
const getUserAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userServices.getUserOrdersIntoDB(id);
        if (result) {
            res.status(200).json({
                success: true,
                massage: 'Order fetched successfully!',
                data: { orders: result === null || result === void 0 ? void 0 : result.orders },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
//controller function to calculate all order's total price of a user
const getUserAllOrdersTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userServices.getUserOrdersTotalPriceIntoDB(id);
        if (typeof result === 'number') {
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: {
                    totalPrice: result,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: 'something went wrong',
            error: err,
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addUserOrder,
    getUserAllOrders,
    getUserAllOrdersTotalPrice,
};
