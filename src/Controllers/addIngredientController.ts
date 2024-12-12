import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import {
  isIdValid,
  stringLengthIsValid,
  userIdExists,
} from "../Services/validators";
import { Connection } from "promise-mysql";

export async function addIngredient(req: Request, res: Response) {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Math.floor(Number(req.params.userId));

    if (!isIdValid(userId) || !(await userIdExists(db, userId))) {
      res.status(400).json({
        message: "Invalid user id",
      });
      return;
    }

    if (!stringLengthIsValid(req.body.name, 1, 254)) {
      res.status(400).json({
        message: "Invalid data",
      });
      return;
    }

    const results = await db.query(
      "INSERT INTO `ingredients` ( name , user_id ) VALUES (?, ?)",
      [req.body.name, userId]
    );
    const newIngredientId = results.insertId;

    res.status(201).json({
      message: "Successfully added ingredient",
      data: {
        id: newIngredientId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error",
      data: error.toString(),
    });
  }
}
