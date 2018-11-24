import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

test('DApp list exists and renders HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/dapps', context)
  t.true(html.includes('The curated list'))
})

test('DApp detail exists and renders HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/dapps/aragon', context)
  t.true(html.includes('Create and manage DAOs'))
})

test('DApp new exists and renders HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/dapps/submit/new', context)
  t.true(html.includes('Submit a ÐApp'))
})

test('Static page exists and renders HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/whats-a-dapp', context)
  t.true(html.includes('Bitcoin laid the first stone'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Close server and nuxt.js', t => {
  nuxt.close()
})
