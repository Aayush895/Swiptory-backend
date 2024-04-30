const express = require('express')
const { registerUser, logIn, showUsers } = require('../controllers/register')
const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', logIn)
router.get('/users', showUsers)

module.exports = router
