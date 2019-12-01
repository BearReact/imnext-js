import {formatCurrency, toDecimal2, intersectionMin} from '../index';

describe('test utils uri', () => {
    it('千分位格式化', () => {
        expect(formatCurrency('1234567', false)).toBe('1,234,567');
        expect(formatCurrency('123456789', false)).toBe('123,456,789');
        expect(formatCurrency('1234567', true)).toBe('1,234,567.00');
    });

    it('保留小數第二位', () => {
        expect(toDecimal2('123.456')).toBe('123.46');
        expect(toDecimal2('123.446')).toBe('123.45');
    });

    it('取得數組中的交集最小範圍', () => {
        expect(
            intersectionMin([
                [1, 20],
                [5, 24],
            ])
        ).toEqual(expect.objectContaining({max: [5, 24], min: 0}));
    });
});
