import express from 'express';
import cors from 'cors';
import getUser from './src/controllers/userController';
import addRecipe from './src/controllers/addRecipeController';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post("/users", getUser)
app.post("/users/:userId/recipes", addRecipe)

app.listen(port);