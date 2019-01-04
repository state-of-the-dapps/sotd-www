export default function(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    console.log(
      `IPLOG ${req.url} ${req.headers['x-forwarded-for']} ${
        req.headers['x-request-id']
      } ${req.headers['user-agent']}`
    )
  }
  next()
}
