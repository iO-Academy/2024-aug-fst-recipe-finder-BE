import {describe, expect, test} from '@jest/globals';


const email = require('../Services/EmailValidator');
const string = require('../Services/IsStringValidator');
const length = require('../Services/StringLenghtValidator');

test('input is a string', () => {
    expect(string.isString('string')).toBe(true);
})

test('input isnt a string', () => {
    expect(string.isString(1)).toBe(false);
})

test('email is valid', () => {
    expect(email.emailValidator('you@me.com')).toBe(true);
})

test('email has too many symbols', () => {
    expect(email.emailValidator('you@@me.com')).toBe(false);
})

test('email has no characters then an @', () => {
    expect(email.emailValidator('@me.com')).toBe(false);
})

test('email has @ then no characters', () => {
    expect(email.emailValidator('you@')).toBe(false);
})

test('email has 64 characters', () => {
    expect(email.emailValidator('you@eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.com')).toBe(true);
})

test('email has over 64 characters', () => {
    expect(email.emailValidator('you@eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.com')).toBe(false);
})

test('email has under 64 characters', () => {
    expect(email.emailValidator('y@m.com')).toBe(true);
})

test('email has special characters', () => {
    expect(email.emailValidator('y@m££.com')).toBe(false);
})

test('email has special characters', () => {
    expect(email.emailValidator('y@m$.com')).toBe(false);
})


test('email is incorrect type', () => {
    expect(email.emailValidator(1)).toBe(false);
})



test('string is a correct length', () => {
    expect(length.validateLength('heeellloooooo')).toBe(true);
})