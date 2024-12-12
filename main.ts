import express from 'express';
import cors from 'cors';
import { getUser } from './src/Controllers/userController';
import { addRecipe } from './src/Controllers/addRecipeController';
import { getAllUserRecipes } from './src/Controllers/getAllUserRecipesController';
import { getRecipeById } from './src/Controllers/getRecipeByIdController';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post("/users", getUser)
app.post("/users/:userId/recipes", addRecipe)
app.get('/users/:userId/recipes', getAllUserRecipes)
app.get('/users/:userId/recipes/:recipeId', getRecipeById)
// app.post('/users/:userId/ingredient', add)

app.listen(port);