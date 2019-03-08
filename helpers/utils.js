export const sum = arr => arr.reduce((a, b) => a + b, 0)

export function interopDefault(promise) {
  return promise.then(m => m.default || m)
}

export function logError(sentry, e) {
  if (typeof sentry !== 'undefined') {
    sentry.captureException(e)
  }
}

export function renderMd($md, content) {
  /* eslint-disable */
  if (!content) return ''
  $md.renderer.rules.link_open = function(
    tokens,
    idx,
    options,
    env,
    slf
  ) {
    const tokenList = tokens[idx]
    tokenList.attrs = tokenList.attrs.map(attr => {
      return attr
    })
    tokenList.attrPush(['target', '_blank'])
    return '<a' + slf.renderAttrs(tokenList) + '>'
  }
  $md.renderer.rules.link_close = function () { return '</a>' }
  return $md.render(content)
}
