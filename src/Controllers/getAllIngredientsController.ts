import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import { isIdValid, userIdExists } from "../Services/validators";
import { Connection } from "promise-mysql";

export async function getAllIngredients(req: Request, res: Response): Promise<void> {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Math.floor(Number(req.params.userId));

    if (!isIdValid(userId) || !(await userIdExists(db, userId))) {
      const ingredients: [{id: number, name: string}] = await db.query(
        "SELECT `id`, `name` FROM `ingredients` WHERE `user_id` = ?",
        [userId]
      );
      res.status(200).json({
        message: "Successfully retrieved all ingredients",
        data: ingredients,
      });
    } else {
      res.status(400).json({
        message: "Invalid user id",
        data: []
      });
    }
  } catch {
    res.status(500).json({
      message: "Unexpected error",
      data: []
    });
  }
}
