export default function errorHandler() {
  console.log('// Error-Handler')
  return (err, req, res, next) => {
    res.status(500).json(err)
  }
}
