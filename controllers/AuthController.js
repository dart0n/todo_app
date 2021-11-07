require('dotenv').config()
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

class AuthController {
  async register(req, res) {
    try {
      // check validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: 'Invalid data', errors: errors.errors })
      }

      const { login, password } = req.body

      const userExists = await User.findOne({ login })
      // if this email in db return error message
      if (userExists) {
        return res.status(409).send({ error: `User with login '${login}' already exists` })
      }

      const hashedPassword = await bcrypt.hash(password, 8)
      const user = new User({ login, password: hashedPassword })
      await user.save()

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      return res.status(201).json({ token, user: { id: user.id, login: user.login } })
    } catch (e) {
      console.log(e)
      res.status(422).json({ error: 'Invalid data' })
    }
  }

  async login(req, res) {
    try {
      // check validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: 'Invalid data', errors: errors.errors })
      }

      const { login, password } = req.body

      const user = await User.findOne({ login })
      if (!user) {
        return res.status(404).send({ error: 'User not found' })
      }

      const isPasswordValid = await bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(422).send({ error: 'Invalid credentials' })
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      res.json({
        token,
        user: { id: user.id, login: user.login },
      })
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: 'Not found' })
    }
  }

  async authenticateUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      return res.json({
        token,
        user: { id: user.id, login: user.login },
      })
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: 'Not found' })
    }
  }
}

module.exports = new AuthController()
