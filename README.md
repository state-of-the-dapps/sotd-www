# State of the DApps Frontend - Nuxt.js

## ENV

- Set up environment variables in `nuxt.config.js` under the `env` constant. (e.g. in ~/.bashrc, add `export API_URL="https://yourapi.com"`)

## Build Setup

### Universal vs SPA

By default, this app is served with SSR. If you want to run this app as an SPA, you can change the mode (set in `nuxt.config.js`) to 'spa' in the env. Then, when you run `nuxt build`, a `dist` folder will be created that can be migrated to a static host such as s3 (with cloudfront). Be sure to redirect all 404 errors to `/index.html` in your server or cloud platform. Otherwise, routes other than `/index.html` will return with a 404 error.

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start
```

## More info

For detailed explanation on how Nuxt works, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js)

## Acknowledgements

- Current design by [Duo](https://www.theduo.io)
- v1 design by [Chris Hitchcott](http://hitchcott.com)

