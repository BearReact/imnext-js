# Nextjs 9 StartKit

## How to use

https://nextjs.org/docs

## Using IDE Setting (WebStorm)

1. `.next` folder search file index is slow,
so you can set `.next` folder `mark directory as` / `excluded`

1. `src/pages` folder is Link Root Path
so you can set `src/pages` folder `mark directory as` / `Resource Root`

2. Javascript language version set `Flow`
   > [Preferences / Languages & Frameworks / javascript language version](https://blog.jetbrains.com/webstorm/2016/11/using-flow-in-webstorm/)
   Flow package or exectable set {your path}/node_modules/flow-bin

3. Install plugin [Styled Components & Styled JSX](https://plugins.jetbrains.com/plugin/9997-styled-components--styled-jsx/)
   > Preferences / Plugins


### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example custom-server-express custom-server-express-app
# or
yarn create next-app --example custom-server-express custom-server-express-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/custom-server-express
cd custom-server-express
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

Most of the times the default Next server will be enough but sometimes you want to run your own server to customize routes or other kind of the app behavior. Next provides a [Custom server and routing](https://github.com/zeit/next.js#custom-server-and-routing) so you can customize as much as you want.

Because the Next.js server is just a node.js module you can combine it with any other part of the node.js ecosystem. in this case we are using express to build a custom router on top of Next.

The example shows a server that serves the component living in `pages/a.js` when the route `/b` is requested and `pages/b.js` when the route `/a` is accessed. This is obviously a non-standard routing strategy. You can see how this custom routing is being made inside `server.js`.
