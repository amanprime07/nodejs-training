import { Response, Router, Request } from "express";
import { db } from "../db/db";

export const userRoutes = Router();

userRoutes.get("/", async (_: Request, res: Response) => {
  const users = await db.user.findMany();
  res.json(users);
});
