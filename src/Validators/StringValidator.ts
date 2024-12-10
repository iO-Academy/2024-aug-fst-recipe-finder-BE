import { error } from "console";
import exp from "constants";

function isString(input) {
    if (typeof input ===  'string'){
        return input
    } else {
        return Error ('not a string')
    }

}

function validateLength(
  string: string,
  maxLength: number,
  minLength: number
): boolean {
  let length = string.length;

  {
    if (length < minLength || length > maxLength) {
    }
    return true;
  }
}

export 
