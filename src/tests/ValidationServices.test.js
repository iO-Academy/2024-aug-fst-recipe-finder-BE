const functions  = require('../src/Services')

test('email is valid'), () => {
    const actual = email('email@io.com');
    const expected = true;
    expected(actual).toBe(expected);

}