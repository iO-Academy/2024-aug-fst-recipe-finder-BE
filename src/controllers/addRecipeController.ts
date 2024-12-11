import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import {
  ingredientIdExists,
  numberLengthIsValid,
  stringLengthIsValid,
  userIdExists,
} from "../Services/validators";
import { Connection } from "promise-mysql";

export async function addRecipe(req: Request, res: Response) {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Number(req.params.userId);

    if (await userIdExists(db, userId)) {
      if (
        stringLengthIsValid(req.body.name, 1, 254) &&
        stringLengthIsValid(req.body.instructions, 1, 65534) &&
        numberLengthIsValid(req.body.prep_time, 1, 10) &&
        numberLengthIsValid(req.body.cook_time, 1, 10)
      ) {
        await db.query(
          "INSERT INTO `recipes` (user_id, name, instructions, prep_time, cook_time) VALUE (?, ?, ?, ?, ?)",
          [
            userId,
            req.body.name,
            req.body.instructions,
            req.body.prep_time,
            req.body.cook_time,
          ]
        );

        const newRecipeId: [{ id: number }] = await db.query(
          "SELECT `id` FROM `recipes` ORDER BY `id` DESC LIMIT 1"
        );

        let inputs = [];
        for (let ingredient of req.body.ingredients) {
          if (await ingredientIdExists(db, ingredient)) {
            inputs.push([newRecipeId[0].id, ingredient]);
          } else {
            res.status(400).json({
              message: "invalid data - ingredient not present",
            });
            return;
          }
        }

        await db.query(
          "INSERT INTO `recipes_ingredient` (recipe_id, ingredient_id) VALUES ?",
          [inputs]
        );

        res.status(201).json({
          message: "Successfully created recipe",
          data: {
            recipeId: newRecipeId[0].id,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid data",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid user id",
      });
    }
  } catch(error){
    res.status(500).json({
      message: "Unexpected error", data: error.toString()
    });
  }
}
