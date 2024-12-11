import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";
import { ingredientIdExists, userIdExists } from "../services/validators";

export async function getAllUserRecipes(req: Request, res: Response) {
  try {
    const db = await getDatabase();
    const userId = req.params.userId;

    if (userIdExists(db, userId)) {
      const recipes = await db.query(
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
      });
    }
  } catch {
    res.status(500).json({
      message: "Unexpected error",
    });
  }
}
