import config from '@config/app';
import {uploadUrl, asset, routePath, serialize, parseQueryString, getMainDomain, getSubDomain} from '../index';

describe('test utils uri', () => {

    it('串後端檔案上傳檔案的基礎網址', () => {
        expect(uploadUrl('promotion/test.jpg', '/upload')).toBe('/upload/promotion/test.jpg');
    });

    it('串接前端的靜態資源基礎網址', () => {
        expect(asset('promotion/test.jpg', '/static')).toBe(`/static/promotion/test.jpg?v=${config.assetVersion}`);
    });

    it('串接前端的路由基礎網址', () => {
        expect(routePath('/promotion/12', '/game-lobby')).toBe('/game-lobby/promotion/12');
    });

    it('Obj轉QueryString', () => {
        expect(serialize({id: 12, isHidden: false})).toBe('id=12&isHidden=false');
    });

    it('解析 Search QueryString 轉成 物件', () => {
        expect(parseQueryString('id=12&isHidden=false')).toEqual(expect.objectContaining({
            id: '12',
            isHidden: 'false'
        }));
    });

    it('取得主網域(二級域名)', () => {
        expect(getMainDomain('www.google.com')).toBe('google.com');
        expect(getMainDomain('vv-5a.test88b.net')).toBe('test88b.net');
        expect(getMainDomain('vv.ibet.test-88b.net')).toBe('test-88b.net');
    });

    it('取得子網域(最後一段)', () => {
        expect(getSubDomain('www.google.com')).toBe('www');
        expect(getSubDomain('vv-5a.test88b.net')).toBe('vv-5a');
        expect(getSubDomain('vv.ibet.test88b.net')).toBe('vv');
    });
});
