import _ from "lodash";
import { Request, Response } from "express";

import UserModel from "../../models/User.model";

/**
 * POST /users
 * Create new user
 */
export default async (httpRequest: Request, httpResponse: Response) => {  
  try {
    const { username, email, password } = httpRequest.body;
    
    const user = await UserModel.create({
      username,
      email,
      password,
    });

    return httpResponse.status(200).json({
      status: 200,
      data: _.pick(user.toObject(), ["_id", "username", "email"])
    });
  } catch (err) {
    return httpResponse.status(500).json({
      status: 500,
      message: "Some error has occurred. Please, try again."
    });
  }
};
