import { Request, Response } from "express";
import getDatabase from "../services/databaseConnector";
import { isEmail } from "../services/validators";

const getUser = async (req: Request, res: Response) => {
  const db = await getDatabase();

  try {
    let email;
    if (isEmail(req.body.email)) {
      email = req.body.email;
    } else {
      res.status(400).json({
        message: "Invalid email",
      });
      return;
    }

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
