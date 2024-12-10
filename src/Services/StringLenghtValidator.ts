export function validateLength(
  string: string,
  maxLength: number,
  minLength: number
): boolean {
  let length = string.length;

  if (length < minLength || length > maxLength) {
    return false;
  } else return true;
}

module.exports = { validateLength };
