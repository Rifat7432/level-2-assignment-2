import {z} from 'zod';

const FullNameZodValidation = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

const AddressZodValidation = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
});

// const OrdersZodValidation = z.object({
//   productName: z.string().nonempty(),
//   price: z.number().nonnegative(),
//   quantity: z.number().nonnegative(),
// });

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
  // orders: z.array(OrdersZodValidation),
  isDeleted: z.boolean().refine((val) => val === true)
});

export default UserZodValidation;
