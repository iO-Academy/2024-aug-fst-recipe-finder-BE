import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";

async function addRecipe(req: Request, res: Response) {
    try {
        const db = await getDatabase()
        const userId = req.params.userId

        async function userIdExists (db, id) {
            const userIdExists = await db.query("SELECT 1 FROM `users` WHERE `id` = ? LIMIT 1;", [ id ])
            return userIdExists.length > 0 ? true : false
        }

        if(await userIdExists(db, userId)) {
            
            await db.query("INSERT INTO `recipes` (user_id, name, instructions, prep_time, cook_time) VALUE (?, ?, ?, ?, ?)",
            [userId, req.body.name, req.body.instructions, req.body.prep_time, req.body.cook_time]);

            // Add data^^^ validation - error code 400, message: "invalid data"
            
            const newRecipeId = await db.query(
                "SELECT `id` FROM `recipes` ORDER BY `id` DESC LIMIT 1"
            );

            let inputs = [];
            req.body.ingredients.forEach(ingredient => {
                inputs.push([newRecipeId[0].id, ingredient])
            });

            await db.query("INSERT INTO `recipes_ingredient` (recipe_id, ingredient_id) VALUES ?", [inputs]);

            res.status(201).json({
                message: "Successfully created recipe",
                data: {
                    recipeId: newRecipeId[0].id
                }
            })
        } else {
            res.status(400).json({
                message: "Invalid user id"
            });
        }
    } catch {
        res.status(500).json({
            message: "Unexpected error"
        });
    }
}

export default addRecipe