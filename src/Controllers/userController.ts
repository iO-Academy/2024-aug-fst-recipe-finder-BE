import { Request, Response } from "express";
import getDatabase from "../Services/databaseConnector";
import { isEmail } from "../Services/validators";

export async function getUser (req: Request, res: Response) {
  try {
    const db = await getDatabase();
    let email: string;
    if (isEmail(req.body.email)) {
      email = req.body.email;
    } else {
      res.status(400).json({
        message: "Invalid email",
      });
      return;
    }

    const existingEmailId: [{id: number}] = await db.query(
      "SELECT `id` FROM `users` WHERE `email` = ?",
      [email]
    );
    if (existingEmailId.length > 0) {
      res.status(200).json({
        message: "Successfully retrieved user",
        data: {
          userId: existingEmailId[0].id,
        },
      });
    } else {

      const results = await db.query("INSERT INTO `users` SET ?", { email: email });
      const newEmailId = results.insertId; 

      res.status(201).json({
        message: "Successfully created user",
        data: {
          userId: newEmailId,
        },
      });
    }
  } catch {
    res.status(500).json({
      message: "Unexpected error",
    });
  }
};
