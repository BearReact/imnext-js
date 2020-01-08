// @flow

import routes from 'next-routes';
import config from '../../config/routes';
import {fixDoubleSlashPath} from '../../utils/uri';

type RouteType = {
    Link: any,
};

const createRoute: RouteType = routes();
const routePrefix = process.env.ROUTE_PREFIX_PATH || '/';

config.map(row => {
    const formatPattern = fixDoubleSlashPath(`${routePrefix}${row.pattern}`);
    createRoute.add(
        {...row, pattern: formatPattern}
    );
    return true;
});

module.exports = createRoute;
