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
    const userId: number = Number(req.params.userId);

    if(!isIdValid(userId) || !(await userIdExists(db, userId))) {
      res.status(400).json({
        message: "Invalid user id",
      });
      return
    }

    if(
      !stringLengthIsValid(req.body.name, 1, 254)
    ) {
      res.status(400).json({
        message: "Invalid data",
      });
      return
    }

    const results = await db.query(
      "INSERT INTO `ingredients` SET ?",
        {
          user_id: userId,
          name: req.body.name,
          instructions: req.body.instructions,
          prep_time: req.body.prep_time,
          cook_time: req.body.cook_time
      }
    );
    const newRecipeId = results.insertId;

    let inputs = validIngredients.map((ingredient) => {
      return [newRecipeId, ingredient]
    })

    await db.query(
      "INSERT INTO `recipes_ingredients` (recipe_id, ingredient_id) VALUES ?",
      [inputs]
    );

    res.status(201).json({
      message: "Successfully created recipe",
      data: {
        recipeId: newRecipeId,
      }
    })

  } catch {
    res.status(500).json({
      message: "Unexpected error"
    });
  }
}
