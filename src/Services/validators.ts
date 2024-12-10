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

export function isEmail(email: string): boolean {
  if (stringLengthIsValid(email, 1, 255)) {
    //change round
    if (typeof email === "string") {
      const regexEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return regexEmail.test(email);
    }
  }
  return false;
}
