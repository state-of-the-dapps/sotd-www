# State of the DApps Frontend - Nuxt.js

Designed by [Engine Collaborative](https://www.enginecollaborative.com)

## Config

### /nuxt.config.js

- Set up environment variables in `nuxt.config.js` under the `env` property. (e.g. in ~/.bashrc, add `export BASE_URL="https://yourapi.com"`)

### /package.json

- Configure the correct host and port for your environment in `package.json`.

```
  "config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "8080"
    }
  }
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how Nuxt works, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js)
