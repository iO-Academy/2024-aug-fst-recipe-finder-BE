import { isString } from "../Services/IsStringValidator";
import { validateLength } from "../Services/StringLenghtValidator";

function emailValidator(email: string): boolean {
  if (validateLength(email, 255, 0)) {
    if (isString(email)) {
        const regexEmail =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (regexEmail.test(email)) {
          return true;
        } else return false;
        
    } else return false
  }
  return false;
}


module.exports = { emailValidator, validateLength, isString };
