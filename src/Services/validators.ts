import { Connection } from "promise-mysql";

export function stringLengthIsValid(
  string: string,
  minLength: number,
  maxLength: number
): boolean {
  let length = string.length;

  if (length < minLength || length > maxLength) {
    return false;
  } else return true;
}

export function numberLengthIsValid(
  number: number,
  minLength: number,
  maxLength: number
): boolean {
  return number.toString().length < minLength || number.toString().length > maxLength ? false : true 
}

export function isEmail(email: string): boolean {
  if (typeof email === "string") {
    if (stringLengthIsValid(email, 1, 255)) {
      const regexEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return regexEmail.test(email);
    }
  }
  return false;
}

export async function userIdExists (db: Connection, id: number): Promise<boolean> {
  const userIdExists = await db.query("SELECT 1 FROM `users` WHERE `id` = ? LIMIT 1;", [ id ])
  return userIdExists.length > 0 ? true : false
}

export async function ingredientIdExists (db: Connection, id: number): Promise<boolean> {
  const ingredientidExists = await db.query("SELECT 1 FROM `ingredients` WHERE `id` = ? LIMIT 1;", [ id ])
  return ingredientidExists.length > 0 ? true : false
}

export async function recipeIdExists (db: Connection, id: number): Promise<boolean> {
  const recipeIdExists = await db.query("SELECT 1 FROM `recipes` WHERE `id` = ? LIMIT 1;", [ id ])
  return recipeIdExists.length > 0 ? true : false
}
