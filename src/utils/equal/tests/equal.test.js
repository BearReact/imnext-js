import {isEmpty} from '../index';

describe('test utils equal', () => {
    it('判定是否為空', () => {
        expect(isEmpty(0)).toBe(false);
        expect(isEmpty(0, true)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
    });
});
