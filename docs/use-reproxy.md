## Environmental parameters

- ROUTE_PREFIX_PATH: /ap-main
- STATIC_BASE_URL: /ap-main/static


## Nginx Config

`test/reproxy/default.conf`

location /ap-main {
     rewrite /ap-main/(.+)$ /$1 break;
     proxy_pass http://localhost:3000;
}

#### Quick Start

```zsh
$ yarn test:reproxy down && yarn test:reproxy up --build

> 🚀 Ready on http://localhost:3001/ap-main/example
```
open browser example in http://localhost:3001/ap-main/example
