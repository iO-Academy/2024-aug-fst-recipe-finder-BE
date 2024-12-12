import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import { ingredientIdExists, userIdExists } from "../Services/validators";
import { Connection } from "promise-mysql";

export async function getSingleIngredient(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Number(req.params.userId);
    const ingredientId: number = Number(req.params.ingredientId);

    if (!userIdExists (db, userId)) {
      res.status(400).json({
        message: "Invalid user id",
        data: [],
      });
      return;
    }
    if (!ingredientIdExists(db, userId)) {
      res.status(400).json({
        message: "Invalid ingredient id",
        data: [],
      });
      return;
    }
    const ingredient: [{ id: number; name: string }] = await db.query(
      "SELECT `id`, `name` FROM `ingredients` WHERE `user_id` = ? AND `id` = ?",
      [userId, ingredientId]
    );
    res.status(200).json({
      message: "Successfully retrieved ingredient",
      data: ingredient,
    });
  } catch {
    res.status(500).json({
      message: "Unexpected error",
      data: [],
    });
  }
}
