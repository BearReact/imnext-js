/* eslint-disable global-require */
import {asset} from '@utils/uri';

// base        基本,
// dark-girl   暗黑美女,
// royal-girl  宮廷美女,
// while-girl  純淨美女,
// magic-girl  魔幻美女

const theme = siteConfig.theme.lobbyLogoTheme;
const basePath = `common/images/game-lobby/logo/${theme}`;
const customPath = 'common/images/game-lobby/logo/custom';
const gameLobby = {
    1040: asset(`${basePath}/1040.jpg`),
    1050: asset(`${basePath}/1050.jpg`),
    1090: asset(`${basePath}/1090.jpg`),
    1140: asset(`${basePath}/1140.jpg`),
    1160: asset(`${basePath}/1160.jpg`),
    1170: asset(`${basePath}/1170.jpg`),
    1180: asset(`${basePath}/1180.jpg`),
    1190: asset(`${basePath}/1190.jpg`),
    1200: asset(`${basePath}/1200.jpg`),
    1210: asset(`${basePath}/1210.jpg`),
    1220: asset(`${basePath}/1220.jpg`),
    1240: asset(`${basePath}/1240.jpg`),
    1250: asset(`${basePath}/1250.jpg`),
    1260: asset(`${basePath}/1260.jpg`),
    1280: asset(`${basePath}/1280.jpg`),
    1310: asset(`${basePath}/1310.jpg`),
    1320: asset(`${basePath}/1320.jpg`),
    1330: asset(`${basePath}/1330.jpg`),
    1340: asset(`${basePath}/1340.jpg`),
    1350: asset(`${basePath}/1350.jpg`),
    1360: asset(`${basePath}/1360.jpg`),
    1370: asset(`${basePath}/1370.jpg`),
    1380: asset(`${basePath}/1380.jpg`),
    1390: asset(`${basePath}/1390.jpg`),
    1400: asset(`${basePath}/1400.jpg`),
    1410: asset(`${basePath}/1410.jpg`),
    1420: asset(`${basePath}/1420.jpg`),
    1430: asset(`${basePath}/1430.jpg`),
    1440: asset(`${basePath}/1440.jpg`),
    1460: asset(`${basePath}/1460.jpg`),
    1470: asset(`${basePath}/1470.jpg`),
    1480: asset(`${basePath}/1480.jpg`),
    1490: asset(`${basePath}/1490.jpg`),
    1500: asset(`${basePath}/1500.jpg`),
    1510: asset(`${basePath}/1510.jpg`),
    1520: asset(`${basePath}/1520.jpg`),
    1530: asset(`${basePath}/1530.jpg`),
    1540: asset(`${basePath}/1540.jpg`),
    1550: asset(`${basePath}/1550.jpg`),
    1560: asset(`${basePath}/1560.jpg`),
    1570: asset(`${basePath}/1570.jpg`),
    1580: asset(`${basePath}/1580.jpg`),
    1581: asset(`${basePath}/1581.jpg`),
    1590: asset(`${basePath}/1590.jpg`),
    1600: asset(`${basePath}/1600.jpg`),
    1610: asset(`${basePath}/1610.jpg`),
    1620: asset(`${basePath}/1620.jpg`),
    1630: asset(`${basePath}/1630.jpg`),
    1640: asset(`${basePath}/1640.jpg`),
    1650: asset(`${basePath}/1650.jpg`),
    1660: asset(`${basePath}/1660.jpg`),
    1680: asset(`${basePath}/1680.jpg`),
    1690: asset(`${basePath}/1690.jpg`),
    1700: asset(`${basePath}/1700.jpg`),
    1710: asset(`${basePath}/1710.jpg`),
    1720: asset(`${basePath}/1720.jpg`),
    1740: asset(`${basePath}/1740.jpg`)
};


// 館別LOGO特例 By 不同版本的圖 (ex: 純淨版但圖案不同)
switch (siteConfig.siteCode) {
    case 'ebo':
        gameLobby['1410'] = asset(`${customPath}/1410-01.jpg`);
        break;
    case 'jack9':
        gameLobby['1410'] = asset(`${customPath}/1410-02.jpg`);
        break;
    case 'hl8my':
        gameLobby['1140'] = asset(`${customPath}/1140-01.jpg`);
        break;
}


export default gameLobby;
