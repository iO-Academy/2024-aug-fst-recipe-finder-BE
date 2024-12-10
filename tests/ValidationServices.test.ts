import {describe, expect, test} from '@jest/globals';
import {stringLengthIsValid, isEmail} from '../src/Services/validators'

test('email is valid', () => {
    expect(isEmail('you@me.com')).toBe(true);
})

test('email has too many @s', () => {
    expect(isEmail('you@@me.com')).toBe(false);
})

test('email has too many domains', () => {
    expect(isEmail('you@me@hhs.com')).toBe(false);
})

test('email has no characters then an @', () => {
    expect(isEmail('@me.com')).toBe(false);
})

test('email has @ then no characters', () => {
    expect(isEmail('you@')).toBe(false);
})

test('email has exactly 255 characters', () => {
    expect(isEmail('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooyou@me.com')).toBe(true);
})

test('email has over 255 characters', () => {
    expect(isEmail('yoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooyou@me.com')).toBe(false);
})

test('email has allowed special characters', () => {
    expect(isEmail("y!#$%&'*+-/=?^_`{|}~@gmail.com")).toBe(true);
})

test('email has not-allowed special characters', () => {
    expect(isEmail('"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com')).toBe(false);
})

test('string is a correct length', () => {
    expect(stringLengthIsValid('heeellloooooo', 1, 255)).toBe(true);
})