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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_zod_1 = __importDefault(require("./user.validation.zod"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: UserData } = req.body;
        const zodParsedData = user_validation_zod_1.default.parse(UserData);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        const data = yield user_service_1.userServices.getUserFromDB(result.userId.toString());
        res.status(200).json({
            success: true,
            massage: 'student found successfully',
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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            massage: 'student found successfully',
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const data = req.body;
        const result = yield user_service_1.userServices.updateUserIntoDB(id, data);
        if (result.modifiedCount === 1) {
            const userData = yield user_service_1.userServices.getUserFromDB(id);
            res.status(200).json({
                success: true,
                massage: 'student found successfully',
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
const addUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const data = req.body;
        const result = yield user_service_1.userServices.addUserOrdersIntoDB(id, data);
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
exports.userController = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addUserOrder,
};
