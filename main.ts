import express from 'express';
import cors from 'cors';
import { getUser } from './src/controllers/userController';
import { addRecipe } from './src/controllers/addRecipeController';
import { getAllUserRecipes } from './src/controllers/getAllUserRecipesController';
import { getRecipeById } from './src/controllers/getRecipeByIdController';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post("/users", getUser)
app.post("/users/:userId/recipes", addRecipe)
app.get('/users/:userId/recipes', getAllUserRecipes)
app.get('/users/:userId/recipes/:recipeId', getRecipeById)

app.listen(port);