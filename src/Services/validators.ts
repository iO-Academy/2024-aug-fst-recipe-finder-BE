import type { Connection } from "promise-mysql";

export function stringLengthIsValid(
  string: string,
  minLength: number,
  maxLength: number
) {
  let length = string.length;

  if (length < minLength || length > maxLength) {
    return false;
  } else return true;
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

export function isIdValid(id: number) {
  const input = Math.floor(Number(id));
  return (
    (!isNaN(input) || isFinite(input)) &&
    input > 0 &&
    stringLengthIsValid(input.toString(), 1, 10)
  );
}

export async function userIdExists(
  db: Connection,
  id: number
): Promise<boolean> {
  const userIdExists = await db.query(
    "SELECT 1 FROM `users` WHERE `id` = ? LIMIT 1;",
    [id]
  );
  return userIdExists.length > 0 ? true : false;
}

export async function ingredientIdExists(
  db: Connection,
  id: number
): Promise<boolean> {
  const ingredientidExists = await db.query(
    "SELECT 1 FROM `ingredients` WHERE `id` = ? LIMIT 1;",
    [id]
  );
  return ingredientidExists.length > 0 ? true : false;
}

export async function recipeIdExists(
  db: Connection,
  id: number
): Promise<boolean> {
  const recipeIdExists = await db.query(
    "SELECT 1 FROM `recipes` WHERE `id` = ? LIMIT 1;",
    [id]
  );
  return recipeIdExists.length > 0 ? true : false;
}
