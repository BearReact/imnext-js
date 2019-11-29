<p align="center"><img src="https://camo.githubusercontent.com/1f8dec51cb01842d7bb7a7cd50ade17c75c5e3bd/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67" width="400"></p>

## About Imnext

Imnext is a web application framework with nextjs, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Imnext takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://nextjs.org).
- [Powerful dependency injection redux and redux-saga](https://redux.js.org).
- [Internationalization-framework i18Next Language](https://www.i18next.com).
- [Expressive, intuitive Storybook](https://storybook.js.org).
- [Quickly build your entire app with our Sass variables and mixins bootstrap](https://getbootstrap.com).
- [Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.](https://github.com/rtfeldman/seamless-immutable).

Imnext is accessible, powerful, and provides tools required for large, robust applications.


## Learning Imnext

Imnext has the most extensive and thorough [documentation](https://nextjs.org/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.


## Using `WebStorm`

1. `.next` folder search file index is slow,
so you can set `.next` folder `mark directory as` / `excluded`

1. `src/pages` folder is Link Root Path
so you can set `src/pages` folder `mark directory as` / `Resource Root`

2. Javascript language version set `Flow`
   > [Preferences / Languages & Frameworks / javascript language version](https://blog.jetbrains.com/webstorm/2016/11/using-flow-in-webstorm/)
   Flow package or exectable set {your path}/node_modules/flow-bin

3. Install plugin [Styled Components & Styled JSX](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx/)
   > Preferences / Plugins


## About use next-i18next

* Version mapping (`Don't install and upgrade react-i18next`)
  - "react": "16.12.0",
  - "next": "9.1.4",
  - "next-i18next": "2.1.1",
  - "storybook-addon-i18n": "git+https://github.com/iFantasyReactNext/storybook-addon-i18n.git#master",
    > wait pull request issue [fix react 16.9.0 rename componentWillMount -> UNSAFE_componentWillMount #10](https://github.com/goooseman/storybook-addon-i18n/pull/10)

* Setting Check 
  - in server.js
    > server.use(nextI18NextMiddleware(nextI18next));
  - in src/library/i18next/configureI18Next.js
    > new NextI18Next(options)
  - in src/pages/_app.js
    > add appWithTranslation provider
  - in public/static/locales