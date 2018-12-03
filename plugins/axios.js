export default function({ app, $axios }) {
  $axios.onError(error => {
    app.$sentry.captureException(new Error(error))
  })
}
