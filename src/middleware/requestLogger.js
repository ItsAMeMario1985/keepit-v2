export default function requestLogger() {
  return (req, res, next) => {
    console.log(req.method, req.body, req.url)
    next()
  }
}
