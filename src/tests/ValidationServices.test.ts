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

test('email has incorrect characters', () => {
    expect(email.emailValidator('you@@me.com')).toBe(false);
})

test('string is a correct length', () => {
    expect(length.validateLength('heeellloooooo')).toBe(true);
})