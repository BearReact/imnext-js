import {hasClass, addClass, removeClass} from '../index';

describe('test utils dom', () => {

    const doc = document.implementation.createDocument('', '', null);
    const peopleElem = doc.createElement('people');

    it('判斷 elements 中的 css class', () => {
        addClass(peopleElem, 'active');
        expect(hasClass(peopleElem, 'active')).toBe(true);

        removeClass(peopleElem, 'active');
        expect(hasClass(peopleElem, 'active')).toBe(false);
    });

});
