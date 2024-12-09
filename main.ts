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
    res.send("Connection successful :)")
})

app.listen(port);

