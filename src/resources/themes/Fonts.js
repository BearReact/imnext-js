import {createGlobalStyle} from 'styled-components';
import {asset} from '@utils/uri';

const Fonts = createGlobalStyle`
    /*Roboto 100*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 100;
        src: local('Roboto Thin'), local('Roboto-Thin'), url(${asset('common/fonts/roboto/dist/Roboto-Thin.woff2')}) format('opentype');
        font-display: optional;
    }
    
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 100;
        src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(${asset('common/fonts/roboto/dist/Roboto-ThinItalic.woff2')}) format('woff2');
        font-display: optional;
    }
    /*Roboto 300*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: local('Roboto Light'), local('Roboto-Light'), url(${asset('common/fonts/roboto/dist/Roboto-Light.woff2')}) format('woff2');
        font-display: optional;
    }
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 300;
        src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(${asset('common/fonts/roboto/dist/Roboto-LightItalic.woff2')}) format('woff2');
        font-display: optional;
    }
    
    /*Roboto 400*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto Regular'), local('Roboto-Regular'), url(${asset('common/fonts/roboto/dist/Roboto-Regular.woff2')}) format('woff2');
        font-display: optional;
    }
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        src: local('Roboto Regular Italic'), local('Roboto-Regular-Italic'), url(${asset('common/fonts/roboto/dist/Roboto-Italic.woff2')}) format('woff2');
        font-display: optional;
    }
    
    /*Roboto 500*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: local('Roboto Medium'), local('Roboto-Medium'), url(${asset('common/fonts/roboto/dist/Roboto-Medium.woff2')}) format('woff2');
        font-display: optional;
    }
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 500;
        src: local('Roboto MediumItalic'), local('Roboto-MediumItalic'), url(${asset('common/fonts/roboto/dist/Roboto-MediumItalic.woff2')}) format('woff2');
        font-display: optional;
    }
    
    /*Roboto 700*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: local('Roboto Bold'), local('Roboto-Bold'), url(${asset('common/fonts/roboto/dist/Roboto-Bold.woff2')}) format('woff2');
        font-display: optional;
    }
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 700;
        src: local('Roboto BoldItalic'), local('Roboto-BoldItalic'), url(${asset('common/fonts/roboto/dist/Roboto-BoldItalic.woff2')}) format('woff2');
        font-display: optional;
    }
    
    /*Roboto 900*/
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 900;
        src: local('Roboto Black'), local('Roboto-Black'), url(${asset('common/fonts/roboto/dist/Roboto-Black.woff2')}) format('woff2');
        font-display: optional;
    }
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 900;
        src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(${asset('common/fonts/roboto/dist/Roboto-BlackItalic.woff2')}) format('woff2');
        font-display: optional;
    }
    
    /* ================================= */
    /*            Helvetica Neue          */
    /* ================================= */
    
    /*HelveticaNeue BlackCond*/
    @font-face {
        font-family: 'HelveticaNeue';
        font-style: normal;
        font-weight: 900;
        src: local('Helvetica Neue HeavyCond'), local('HelveticaNeue-HeavyCond'), url(${asset('common/fonts/helvetica-neue/HelveticaNeue-HeavyCond.woff2')}) format('woff2');
        font-display: swap;
    }
`;


export default Fonts;
