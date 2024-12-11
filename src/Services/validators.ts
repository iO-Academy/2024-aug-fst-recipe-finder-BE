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
  let length = number.toString.length;

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
