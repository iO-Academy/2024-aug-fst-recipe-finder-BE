import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";
import { userIdExists } from "../services/validators";
import { Connection } from "promise-mysql";

export async function getAllUserRecipes(req: Request, res: Response): Promise<void> {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Number(req.params.userId);

    if (await userIdExists(db, userId)) {
      const recipes: [{id: number, name: string, duration: number}] = await db.query(
        "SELECT `id`, `name`, (`prep_time` + `cook_time`) AS 'duration' FROM `recipes` WHERE `user_id` = ?",
        [userId]
      );
      res.status(200).json({
        message: "Successfully retrieved all recipes",
        data: recipes,
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
