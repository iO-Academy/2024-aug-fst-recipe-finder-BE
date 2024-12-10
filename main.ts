import express from 'express';
import cors from 'cors';
import mysql from 'promise-mysql';
const app = express();
const port = 3002;
import http from 'http';
const hostname = '127.0.0.1';

app.use(cors());
app.use(express.json());

app.get ('/', (req, res) => {
    res.send("Connection successful :D")
})



const dbDetails = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "foodhub",
}
app.get("/all", async (req, res) => {
const db = await mysql.createConnection(dbDetails);
const recipes = await db.query('SELECT * FROM `recipes`');
res.json(recipes);
});

app.listen(port);