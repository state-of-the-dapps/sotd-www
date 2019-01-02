export const sum = arr => arr.reduce((a, b) => a + b, 0)

export function interopDefault(promise) {
  return promise.then(m => m.default || m)
}

export function logError(sentry, e) {
  if (typeof sentry !== 'undefined') {
    sentry.captureException(e)
  }
}
