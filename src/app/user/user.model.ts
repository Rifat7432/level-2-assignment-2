import { Schema, model } from 'mongoose';
import { Address, FullName, User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const FullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// const OrdersSchema = new Schema<Orders>({
//   productName:{type:String,required:true},
//   price:{type:Number,required:true},
//   quantity:{type:Number,required:true}
// });

const UserSchema = new Schema<User>({
  userId: { unique: true, type: Number, index: true },
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: { type: AddressSchema, required: true },
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
UserSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<User>('User', UserSchema);