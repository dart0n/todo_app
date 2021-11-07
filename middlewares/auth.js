require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next()

  try {
    const token = req.headers.authorization.split(' ')[1] // remove Bearer
    if (!token) return res.status(401).json({ error: 'Authentication error' })

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Authentication error' })
  }
}
