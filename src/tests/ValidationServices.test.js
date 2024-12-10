const email = require('../Services/EmailValidator');
const string = require('../Services/IsStringValidator');

// test('string is valid'), () => {
//     const actual = ;
//     const expected = true;
//     expect(actual).toBe(expected);

// }

test('string is valid', () => {
    expect(string.isString('string')).toBe(true);
})

test('email is valid', () => {
    expect(email.emailValidator('you@me.com')).toBe(true);
})