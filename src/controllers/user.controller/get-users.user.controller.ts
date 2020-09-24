import UserModel from "../../models/User.model";

import { Request, Response } from "express";

/**
 * GET /users
 * Get all users from UserModel
 */
export default async (httpRequest: Request, httpResponse: Response) => {  
  try {
    const users = await UserModel.find(
      {}, 
      { 
        __v: false, 
        salt: false, 
        password: false,
        createdAt: false,
        updatedAt: false,
      }
    );

    return httpResponse.status(200).json({
      status: 200,
      data: users
    });
  } catch (err) {
    return httpResponse.status(500).json({
      status: 500,
      message: "Some error has occurred. Please, try again."
    });
  }
};
