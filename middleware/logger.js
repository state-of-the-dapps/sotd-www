export default function(req, res, next) {
  console.log(
    `IPLOG ${req.path} ${req.headers['CF-Connecting-IP']} ${
      req.headers['x-request-id']
    } ${req.headers['user-agent']}`
  )
  next()
}
