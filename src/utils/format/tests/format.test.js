import {
    toCapitalize, toLocaleUpCase, RGBToHex, HEXToRGB, HEXToRGBA, paddingLeft, autoMapper, px2vw,
} from '../index';

describe('test format function', () => {
    const expected = ['pineapple', 'apple', 'pen'];

    it('format string toCapitalize', () => {
        expect(toCapitalize('goodApple')).toBe('GoodApple');
    });

    it('format lang code to Locale Up Case', () => {
        expect(toLocaleUpCase('zh-tw')).toBe('zh-TW');
    });

    it('format rgb to hex', () => {
        expect(RGBToHex('rgb(0, 0, 0)')).toBe('000000');
    });

    it('format hex to rgb', () => {
        expect(HEXToRGB('#000000')).toEqual(expect.arrayContaining([0, 0, 0]));
    });

    it('format hex to rgba', () => {
        expect(HEXToRGBA('#000000', 0.5)).toEqual(expect.arrayContaining([0, 0, 0, 0.5]));
    });

    it('format number padding 0', () => {
        expect(paddingLeft(123, 5)).toBe('00123');
    });

    it('format object auto Mapper', () => {
        expect(
            autoMapper(
                {
                    firstName: 'sam',
                    lastName: 'chiu',
                },
                {
                    firstName: 'realName',
                    lastName: 'niceName',
                }
            )
        ).toEqual(
            expect.objectContaining({
                realName: 'sam',
                niceName: 'chiu',
            })
        );
    });

    it('format px2vw', () => {
        expect(px2vw(12)).toBe('3.75vw');
    });
});
