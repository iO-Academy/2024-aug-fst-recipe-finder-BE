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
