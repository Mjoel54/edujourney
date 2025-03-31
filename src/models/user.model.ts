import { query } from "../config/db";
import { CreateUserDTO, UserResponse } from "../types/user";
import bcrypt from "bcrypt";

export class UserModel {
  static async create(userData: CreateUserDTO): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await query(
      `INSERT INTO users (email, password, first_name, last_name, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, email, first_name, last_name, created_at, updated_at`,
      [userData.email, hashedPassword, userData.first_name, userData.last_name]
    );
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<UserResponse | null> {
    const result = await query(
      `SELECT id, email, first_name, last_name, created_at, updated_at
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }
}
