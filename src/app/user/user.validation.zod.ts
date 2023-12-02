import {z} from 'zod';

// using zod for validating data

// FullName Zod Validation
const FullNameZodValidation = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

// Address Zod Validation
const AddressZodValidation = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
});


// Orders Zod Validation
export const OrdersZodValidation = z.object({
  productName: z.string().nonempty(),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});


// User Zod Validation
const UserZodValidation = z.object({
  userId: z.number().int(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  fullName: FullNameZodValidation,
  age: z.number().nonnegative(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressZodValidation,
  orders: z.array(OrdersZodValidation).optional(),
  isDeleted: z.boolean().default(false)
});

//exporting User Zod Validation
export default UserZodValidation;
