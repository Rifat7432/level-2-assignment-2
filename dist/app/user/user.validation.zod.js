"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersZodValidation = void 0;
const zod_1 = require("zod");
// using zod for validating data
// FullName Zod Validation
const FullNameZodValidation = zod_1.z.object({
    firstName: zod_1.z.string().nonempty(),
    lastName: zod_1.z.string().nonempty(),
});
// Address Zod Validation
const AddressZodValidation = zod_1.z.object({
    street: zod_1.z.string().nonempty(),
    city: zod_1.z.string().nonempty(),
    country: zod_1.z.string().nonempty(),
});
// Orders Zod Validation
exports.OrdersZodValidation = zod_1.z.object({
    productName: zod_1.z.string().nonempty(),
    price: zod_1.z.number().nonnegative(),
    quantity: zod_1.z.number().nonnegative(),
});
// User Zod Validation
const UserZodValidation = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string().nonempty(),
    password: zod_1.z.string().nonempty(),
    fullName: FullNameZodValidation,
    age: zod_1.z.number().nonnegative(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressZodValidation,
    orders: zod_1.z.array(exports.OrdersZodValidation).optional(),
    isDeleted: zod_1.z.boolean().default(false)
});
//exporting User Zod Validation
exports.default = UserZodValidation;
