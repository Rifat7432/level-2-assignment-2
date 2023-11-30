import { userServices } from './user.service';
import { Request, Response } from 'express';
import UserZodValidation from './user.validation.zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      massage: 'Users fetched successfully!y',
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;
    const result = await userServices.updateUserIntoDB(id, data);
    if (result.modifiedCount === 1) {
      const userData = await userServices.getUserFromDB(id);
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
const addUserOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;
    const result = await userServices.addUserOrdersIntoDB(id, data);
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
const getUserAllOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getUserOrdersIntoDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        massage: 'Order fetched successfully!',
        data:{orders:result?.orders},
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
const getUserAllOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getUserOrdersTotalPriceIntoDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        massage: 'Order fetched successfully!',
        data:result,
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

export const userController = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addUserOrder,
  getUserAllOrders,
  getUserAllOrdersTotalPrice
};
