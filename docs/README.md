## Using WebStorm

1. `.next` folder search file index is slow,
so you can set `.next` folder `mark directory as` / `excluded`

1. `src/pages` folder is Link Root Path
so you can set `src/pages` folder `mark directory as` / `Resource Root`

2. Javascript language version set `Flow`
   > [Preferences / Languages & Frameworks / javascript language version](https://blog.jetbrains.com/webstorm/2016/11/using-flow-in-webstorm/)
   Flow package or exectable set {your path}/node_modules/flow-bin

3. Install plugin [Styled Components & Styled JSX](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx/)
   > Preferences / Plugins


## Using next-i18next

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
  
## Using bootstrap4

If you need to change settings like `grid-columns`, `grid-breakpoints`, `container-max-widths`
> src/resources/assets/scss/common/_variable.scss
>
```
$ yarn bootstrap:build
```