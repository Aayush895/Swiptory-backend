const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']
    if(!token) {
      return res.send({
        message: "Unauthorized access"
      })
    }
    const userDetails = jwt.verify(token, process.env.JWT_SECRET)
    req.body.user = userDetails

    if (!userDetails) {
      res.send({
        message: 'Please login in order to view this page!',
      })
    }

    next()
  } catch (error) {
    console.log(error)
    // throw new Error('Please enter a valid session token')
  }
}

module.exports = validateToken
