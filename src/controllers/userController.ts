import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";

const getUser = async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const email = req.body.email;
    const existingEmailId = await db.query(
      "SELECT `id` FROM `users` WHERE `email` = ?",
      [email]
    );
    if (existingEmailId.length > 0) {
      res.json({
        message: "successfully retrieved user",
        data: {
          userId: existingEmailId[0].id,
        },
      });
    } else {
      await db.query("INSERT INTO `users` (email) VALUE (?)", [email]);
      const newEmailId = await db.query(
        "SELECT `id` FROM `users` ORDER BY `id` DESC LIMIT 1"
      );
      res.json({
        message: "successfully added user",
        data: {
          userId: newEmailId[0].id,
        },
      });
    }
  } catch {
    res.status(500).json({
      message: "Unexpected error",
    });
  }
};

export default getUser;
