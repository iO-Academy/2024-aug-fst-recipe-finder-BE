import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";
import { userIdExists, recipeIdExists } from "../services/validators";
import { Connection } from "promise-mysql";

interface Ingredient {id: number, name: string}
interface Recipe {
  id: number,
  name: string,
  instructions: string,
  prep_time: number,
  cook_time: number,
  ingredients: [Ingredient]
}

export async function getRecipeById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Number(req.params.userId);
    const recipeId: number = Number(req.params.recipeId);

    if (
      (await userIdExists(db, userId)) &&
      (await recipeIdExists(db, recipeId))
    ) {
      let recipe: Recipe = await db.query(
        "SELECT `id`, `name`, `instructions`, `prep_time`, `cook_time` FROM `recipes` WHERE `id` = ?",
        [recipeId]
      );
      recipe = recipe[0]

      const ingredients: [Ingredient] = await db.query(`
        SELECT ingredients.id, ingredients.name
        FROM ingredients
        JOIN recipes_ingredient
        ON ingredients.id = recipes_ingredient.ingredient_id
        WHERE recipes_ingredient.recipe_id = 1;
      `);
      recipe.ingredients = ingredients


      res.status(200).json({
        message: "Successfully retrieved recipe",
        data: recipe
      });
    } else {
      res.status(400).json({
        message: "Invalid id",
        data: [],
      });
    }
  } catch {
    res.status(500).json({
      message: "Unexpected error",
      data: [],
    });
  }
}
