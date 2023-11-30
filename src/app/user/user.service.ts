import { Orders, User } from './user.interface';
import { UserModel } from './user.model';


// service function for posting user in DB
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

// service function for putting user orders in DB
const addUserOrdersIntoDB = async (id: string, order: Orders) => {
  const result = await UserModel.updateOne(
    { userId: id,isDeleted:false },
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
  const result = await UserModel.findOne({ userId: id,isDeleted:false});
  return result;
};

// service function for posting user in DB
const getUserOrdersTotalPriceIntoDB = async (id:string) => {
  const result = await UserModel.findOne({userId:id,isDeleted:false})
  console.log(result)
  if(result !== null && result.orders ){
  return result.orders.reduce((totalPrice:number, order:Orders) => totalPrice + order.price, 0);
}
else{
  return null
}
};


// service function for deleting user in DB
const deleteUserIntoDB = async (id: string) => {
  const result = await UserModel.updateOne(
    { userId: id,isDeleted:false },
    {
      $set: {
        isDeleted: true,
      },
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
  const result = await UserModel.updateOne(
    { userId: id,isDeleted:false },
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

// service function for getting all users in DB
const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {isDeleted:false},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 1 },
  );
  return result;
};
const getUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne(
    { userId,isDeleted:false },
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
