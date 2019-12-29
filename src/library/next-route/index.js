const routes = require('next-routes');
const config = require('../../config/routes');

const createRoute = routes();
const routePrefix = process.env.ROUTE_PREFIX_PATH || '/';
config.map(row => {
    createRoute.add(
        {...row, pattern: `${routePrefix}${row.pattern}`}
    );
    return true;
});

module.exports = createRoute;
