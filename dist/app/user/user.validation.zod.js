"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const FullNameZodValidation = zod_1.z.object({
    firstName: zod_1.z.string().nonempty(),
    lastName: zod_1.z.string().nonempty(),
});
const AddressZodValidation = zod_1.z.object({
    street: zod_1.z.string().nonempty(),
    city: zod_1.z.string().nonempty(),
    country: zod_1.z.string().nonempty(),
});
// const OrdersZodValidation = z.object({
//   productName: z.string().nonempty(),
//   price: z.number().nonnegative(),
//   quantity: z.number().nonnegative(),
// });
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
    // orders: z.array(OrdersZodValidation),
    isDeleted: zod_1.z.boolean().refine((val) => val === true)
});
exports.default = UserZodValidation;
