import {insert, push} from '../index';

describe('test utils array', () => {
    const expected = ['pineapple', 'apple', 'pen'];

    it('插入資料到陣列的第一筆', () => {
        expect(insert(['apple', 'pen'], 'pineapple')).toEqual(expect.arrayContaining(expected));
    });

    it('插入資料到陣列的結尾', () => {
        expect(push(['pineapple', 'apple'], 'pen')).toEqual(expect.arrayContaining(expected));
    });
});
