import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import {
  userIdExists,
  recipeIdExists,
  isIdValid,
} from "../Services/validators";
import { Connection } from "promise-mysql";

interface Ingredient {
  id: number;
  name: string;
}
interface Recipe {
  id: number;
  name: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  ingredients: Ingredient[];
}

export async function getRecipeById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const db: Connection = await getDatabase();
    const userId: number = Number(req.params.userId);
    const recipeId: number = Number(req.params.recipeId);

    if (!isIdValid(userId) || !(await userIdExists(db, userId))) {
      res.status(400).json({
        message: "Invalid user id",
      });
      return;
    }

    if (!isIdValid(recipeId) || !(await recipeIdExists(db, recipeId))) {
      res.status(400).json({
        message: "Invalid recipe id",
      });
      return;
    }

    let recipe: Recipe = await db.query(
      "SELECT `id`, `name`, `instructions`, `prep_time`, `cook_time` FROM `recipes` WHERE `id` = ?",
      [recipeId]
    );
    recipe = recipe[0];

    const ingredients: Ingredient[] = await db.query(
      `
      SELECT ingredients.id, ingredients.name
      FROM ingredients
      JOIN recipes_ingredients
      ON ingredients.id = recipes_ingredients.ingredient_id
      WHERE recipes_ingredients.recipe_id = ?;
    `, [recipeId]
    );
    recipe.ingredients = ingredients;

    res.status(200).json({
      message: "Successfully retrieved recipe",
      data: recipe,
    });
  } catch (error){
    res.status(500).json({
      message: "Unexpected error",
      data: [], error: error.toString()
    });
  }
}
