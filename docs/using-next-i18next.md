# Using next-i18next

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
  