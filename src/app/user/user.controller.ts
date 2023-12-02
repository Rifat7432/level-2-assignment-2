import { userServices } from './user.service';
import { Request, Response } from 'express';
import UserZodValidation, { OrdersZodValidation } from './user.validation.zod';

//controller function to create a user
const createUser = async (req: Request, res: Response) => {
  try {
    //getting user data
    const { user: UserData } = req.body;
//validating data by zod
    const zodParsedData = UserZodValidation.parse(UserData);
    const result = await userServices.createUserIntoDB(zodParsedData);
    const data = await userServices.getUserFromDB(result.userId.toString());
    res.status(200).json({
      success: true,
      massage: 'ser created successfully!',
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      massage: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to get a user
const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getUserFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        massage: 'student found successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to update a user
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    //getting user data
    const data = req.body;
    //validating data by zod
    const zodParsedData = UserZodValidation.parse(data)
    const result = await userServices.updateUserIntoDB(id, zodParsedData);
    if (result.modifiedCount === 1) {
      const userData = await userServices.getUserFromDB(data?.userId);
      res.status(200).json({
        success: true,
        massage: 'User updated successfully!',
        data: userData,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.deleteUserIntoDB(id);
    if (result.modifiedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to add order into a user
const addUserOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    //getting user data
    const data = req.body;
    //validating data by zod
    const zodParsedData = OrdersZodValidation.parse(data)
    const result = await userServices.addUserOrdersIntoDB(id, zodParsedData);
    if (result.modifiedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to get all orders of a user
const getUserAllOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getUserOrdersIntoDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        massage: 'Order fetched successfully!',
        data: { orders: result?.orders },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};
//controller function to calculate all order's total price of a user
const getUserAllOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getUserOrdersTotalPriceIntoDB(id);
    if (typeof result === 'number') {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: result,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: 'something went wrong',
      error: err,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addUserOrder,
  getUserAllOrders,
  getUserAllOrdersTotalPrice,
};
