import { Router, RequestHandler } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

const createUserHandler: RequestHandler = async (req, res) => {
  await UserController.createUser(req, res);
};

router.post("/register", createUserHandler);

export default router;
