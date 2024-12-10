import { Request, Response } from "express";
import  getDatabase from "../services/databaseConnector";

const getUser = async (req: Request, res: Response) => {
    const db = await getDatabase();
    const email = req.body.email;
    const existingEmailId = await db.query(
        "SELECT `id` FROM `users` WHERE `email` = ?",
        [email]
    );
    res.json({
        message: "successfully retrieved user",
        data: {
            userID: existingEmailId,
        },
    });
};

export default getUser;
