import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { CreateUserDTO } from "../types/user";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const userData: CreateUserDTO = req.body;

      // Validate required fields
      if (
        !userData.email ||
        !userData.password ||
        !userData.first_name ||
        !userData.last_name
      ) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["email", "password", "first_name", "last_name"],
        });
      }

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({
          error: "User with this email already exists",
        });
      }

      const user = await UserModel.create(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
