// grid (請與 src/resources/assets/scss/common/_variable.scss 設定保持一致)
export const gridBreakpoints = {
    xs: 0,
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1540px',
};

export default {
    xs: `screen and (min-width: ${gridBreakpoints.xs})`,
    sm: `screen and (min-width: ${gridBreakpoints.sm})`,
    md: `screen and (min-width: ${gridBreakpoints.md})`,
    lg: `screen and (min-width: ${gridBreakpoints.lg})`,
    xl: `screen and (min-width: ${gridBreakpoints.xl})`,
    xxl: `screen and (min-width: ${gridBreakpoints.xxl})`,
};
