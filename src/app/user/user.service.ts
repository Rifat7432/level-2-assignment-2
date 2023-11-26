import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const updateUserIntoDB = async (userId: string,dataToUpdate:User) => {
  const result = await UserModel.updateOne({userId},dataToUpdate);
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
  updateUserIntoDB
};
