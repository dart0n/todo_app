const { Schema, model, ObjectId } = require('mongoose')

const User = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projects: [{ type: ObjectId, ref: 'Project' }],
})

module.exports = model('User', User)
