## Environmental parameters

- ROUTE_PREFIX_PATH: /ap-main

## Route Config

`src/config/routes.js`

## redirect to /example (by router)

Event target
```js
//import
import {Router} from '@library/nextRoute';

// use
Router.pushRoute('example')
```

Component Link
```js
// import
import A from '@components/atoms/A';

// use
<A route="example">Go Example</A>
```
