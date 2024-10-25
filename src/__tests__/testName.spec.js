import { checkForName } from '../client/js/nameChecker.js';

describe('Test check Name functionality', () => {
    test('checkForName is defined', () => {
        expect(checkForName).toBeDefined();
    });

    test('checkForName returns false for invalid URL', () => {
        expect(checkForName('elzanaty')).toBeFalsy();
    });

    test('checkForName returns true for valid URL', () => {
        expect(checkForName('http://example.com')).toBeTruthy();
    });
});
