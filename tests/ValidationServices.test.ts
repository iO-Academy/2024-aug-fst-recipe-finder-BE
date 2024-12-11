import { describe, expect, test } from "@jest/globals";
import {
  stringLengthIsValid,
  isEmail,
  numberLengthIsValid,
} from "../src/services/validators";


describe("Email is valid Tests", () => {
  test("email is valid", () => {
    expect(isEmail("you@me.com")).toBe(true);
  });

  test("email has too many @s", () => {
    expect(isEmail("you@@me.com")).toBe(false);
  });

  test("email has too many domains", () => {
    expect(isEmail("you@me@hhs.com")).toBe(false);
  });

  test("email has no characters then an @", () => {
    expect(isEmail("@me.com")).toBe(false);
  });

  test("email has @ then no characters", () => {
    expect(isEmail("you@")).toBe(false);
  });

  test("email has exactly 255 characters", () => {
    expect(
      isEmail(
        "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooyou@me.com"
      )
    ).toBe(true);
  });

  test("email has over 255 characters", () => {
    expect(
      isEmail(
        "yoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooyou@me.com"
      )
    ).toBe(false);
  });

  test("email has allowed special characters", () => {
    expect(isEmail("y!#$%&'*+-/=?^_`{|}~@gmail.com")).toBe(true);
  });

  test("email has not-allowed special characters", () => {
    expect(
      isEmail(
        '"very.(),:;<>[]".VERY."very@\\ "very".unusual"@strange.example.com'
      )
    ).toBe(false);
  });
});

describe("StringLengthIsvalid Tests", () => {
  test("string is a correct length", () => {
    expect(stringLengthIsValid("heeellloooooo", 1, 255)).toBe(true);
  });

  test("string is under the minimum length is set to no characters", () => {
    expect(stringLengthIsValid("", 1, 255)).toBe(false);
  });

  test("string is over maximum length, is set to 11 characters", () => {
    expect(stringLengthIsValid("loooooooool", 1, 10)).toBe(false);
  });
});

describe("NumberLengthIsvalid Tests", () => {
  test("number is a correct length", () => {
    expect(numberLengthIsValid(12345678910, 1, 255)).toBe(true);
  });

  test("number under the minimum length is fails", () => {
    expect(numberLengthIsValid(1, 2, 255)).toBe(false);
  });

  test("number is over maximum length, is set to 11 characters", () => {
    expect(numberLengthIsValid(12345678910, 1, 10)).toBe(false);
  });
});
