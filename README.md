<p align="center"><img src="https://camo.githubusercontent.com/1f8dec51cb01842d7bb7a7cd50ade17c75c5e3bd/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67" width="400"></p>

## About Imnext

Imnext is a web application framework with nextjs, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Imnext takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://nextjs.org).
- [Powerful dependency injection redux](https://redux.js.org).
- [Aims to make application side effects library redux-saga](https://redux-saga.js.org).
- [Internationalization-framework i18Next Language](https://www.i18next.com).
- [Expressive, intuitive Storybook](https://storybook.js.org).
- [delightful JavaScript Testing Framework with a focus on simplicity Jest](https://jestjs.io).
- [Form controller Formlk](https://jaredpalmer.com/formik/docs/overview).
- [Form validation Yup](https://github.com/jquense/yup).
- [Find and fix problems in your JavaScript code ESLint](https://eslint.org).
- [Quickly build your entire app with our Sass variables and mixins bootstrap](https://getbootstrap.com).
- [Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.](https://github.com/rtfeldman/seamless-immutable).

Imnext is accessible, powerful, and provides tools required for large, robust applications.


## Learning Imnext

- Nextjs [Documentation](https://nextjs.org/docs)
- Imnext-js
  - [use Webstorm](https://github.com/imagine10255/imnext-js/blob/master/docs/use-webstorm.md)
  - [use Precommit](https://github.com/imagine10255/imnext-js/blob/master/docs/use-precommit.md)
  - [use Bootstrap](https://github.com/imagine10255/imnext-js/blob/master/docs/use-bootstrap.md)
  - [use Next-i18next](https://github.com/imagine10255/imnext-js/blob/master/docs/use-next-i18next.md)
  
## How to use

`Check your nodejs version is 12`


## Environmental parameters

- PORT: 運行埠號
- SITE_ENV: sandbox (開發), staging (前哨) production (正式)
- SITE_CODE: 站台代號 (ref: src/config/site.js, ex: imnext)
- BUNDLE_BASE_PATH: /_next 前綴路徑 (ex: /)
- STATIC_BASE_URL: 前端靜態資源路徑 (ex: /static)
- API_BASE_URL: API Base path


#### Quick Start

```zsh
# Clone project
$ clone git@github.com:imagine10255/imnext.git my-imnext-project

# Enter folder and Install, then copy environment setting
$ cd my-imnext-project && yarn && cp .env.sandbox .env

# Start develop
$ yarn dev

> 🚀 Ready on http://localhost:3000
```
open browser example in http://localhost:3000/example

#### Develop

```zsh
# Ready Release
$ docker-compose build

# Run
$ docker-compose up --build

> 🚀 Ready on http://localhost:3000
```

#### Export No Server File

```zsh
# Build and Exprot
$ yarn build && yarn export

# Test Run
$ yarn export:start

> Local: http://localhost:8080 
```

#### Remove example

```zsh
$ rm -rf ./src/pages/example ./public/static/images/example ./src/container/example ./public/static/locales/*/example.json
```
