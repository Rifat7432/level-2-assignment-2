import { Orders, User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const addUserOrdersIntoDB = async (id: string, order: Orders) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: {
        orders: order,
      },
    },
  );
  return result;
};
const getUserOrdersIntoDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};
const getUserOrdersTotalPriceIntoDB = async (id:string) => {
  const result = await UserModel.findOne({userId:id})
  return result;
};
const deleteUserIntoDB = async (id: string) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $set: {
        isDeleted: true,
      },
    },
  );
  return result;
};
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
  const result = await UserModel.updateOne(
    { userId: id },
    {
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
    },
  );
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 },
  );
  return result;
};
const getUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      orders: 1,
    },
  );
  return result;
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
