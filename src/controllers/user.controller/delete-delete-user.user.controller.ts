import { isValidObjectId } from "mongoose";
import { Request, Response } from "express";

import UserModel from "../../models/User.model";

/**
 * DELETE /users/:userId
 * Delete user record
 * @param {string} userId - ObjectId of userId
 */
export default async (httpRequest: Request, httpResponse: Response) => {  
  try {
    const { userId } = httpRequest.params;
    
    if (!isValidObjectId(userId)) {
      return httpResponse.status(400).json({
        status: 400,
        message: "UserID parameter should be a valid ObjectId."
      });
    }

    const user = await UserModel.findOneAndUpdate({
      _id: userId
    }, {
      delete: true,
    }, { new: true });

    if (!user) {
      return httpResponse.status(404).json({
        status: 404,
        message: "UserID does not exists"
      });
    }
    
    return httpResponse.status(200).json({
      status: 200,
      message: "User has been deleted successfully",
    });
  } catch (err) {
    return httpResponse.status(500).json({
      status: 500,
      message: "Some error has occurred. Please, try again."
    });
  }
};
