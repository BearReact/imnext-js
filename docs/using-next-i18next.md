# Using next-i18next

## Version mapping (`Don't install and upgrade react-i18next`)
- "react": "16.12.0"
- "next": "9.1.4"
- "next-i18next": "2.1.1"
- "storybook-addon-i18n": "5.1.13"

## Setting Check 
- in server.js
  > server.use(nextI18NextMiddleware(nextI18next));
- in src/library/i18next/configureI18Next.js
  > new NextI18Next(options)
- in src/pages/_app.js
  > add appWithTranslation provider
- in public/static/locales  
  
## Warning Namespace not find in page-level

`You have not declared a namespacesRequired array on your page level component: withI18nextTranslation(Error). This will cause all namespaces to be sent down to the client, possibly negatively impacting the performance of your app. For more info, see: https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies`

> check `withTranslation([namespace])` namespace has in public/static/locales/{namespace}` 
  
## Namespaces and withTranslation example
- Page Level use:
```js
const PageName = ({t}) => <div>{t('example:title')}</div>;
PageName.getInitialProps = async () => ({
    namespacesRequired: ['example'],
});
export default withTranslation()(PageName);
```  
- Component Level use:
```js
const ComponentName = ({t}) => <div>{t('example:title')}</div>;
export default withTranslation(['example'])(ComponentName);
``` 


## Next Export First Render Can't Change Language
check config src/library/i18next/configureI18Next.js, default language cannot in the list

```js
// this is error:
const I18Next = new NextI18Next({
    defaultLanguage: ['en-US'],
    otherLanguages: ['en-US', 'zh-CN'],
});
I18Next.i18n.languages = ['en-US', 'zh-CN']; // <~ check this

// this is success:
const I18Next = new NextI18Next({
    defaultLanguage: ['en-US'],
    otherLanguages: ['en-US', 'zh-CN'],
});
I18Next.i18n.languages = ['zh-CN']; // <~ check this

``` 
