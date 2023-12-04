import config from '../config';
import { Orders, User } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

// service function for posting user in DB
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// service function for getting all users from DB
const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    { isDeleted: false },
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// service function for getting a user from DB

const getUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne(
    { userId, isDeleted: false },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};

// service function for updating user in DB
const updateUserIntoDB = async (id: string, dataToUpdate: User) => {
  const {
    userId,
    username,
    password,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  } = dataToUpdate;
  //making password hash
  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await UserModel.updateOne(
    { userId: id, isDeleted: false },
    {
      $set: {
        userId,
        username,
        password: hashPassword,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    },
  );
  console.log(result);
  return result;
};

// service function for deleting user in DB
const deleteUserIntoDB = async (id: string) => {
  const result = await UserModel.updateOne(
    { userId: id, isDeleted: false },
    {
      $set: {
        isDeleted: true,
      },
    },
  );
  return result;
};

// service function for putting user orders in DB
const addUserOrdersIntoDB = async (id: string, order: Orders) => {
  const result = await UserModel.updateOne(
    { userId: id, isDeleted: false },
    {
      $push: {
        orders: order,
      },
    },
  );
  return result;
};

// service function for getting user's orders from DB
const getUserOrdersIntoDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id, isDeleted: false });
  return result;
};

// service function for getting user's orders total price in DB
const getUserOrdersTotalPriceIntoDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id, isDeleted: false });
  if (result !== null && result.orders) {
    const totalPrice = result.orders.reduce(
      (totalPrice: number, order: Orders) => totalPrice + order.price,
      0,
    );
    return totalPrice;
  } else {
    return null;
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserIntoDB,
  deleteUserIntoDB,
  addUserOrdersIntoDB,
  getUserOrdersIntoDB,
  getUserOrdersTotalPriceIntoDB,
};
