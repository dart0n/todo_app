const { model, Schema, ObjectId } = require('mongoose')

const Project = new Schema(
  {
    name: { type: String, required: true },
    tasks: [{ type: ObjectId, ref: 'Task' }],
    user_id: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = model('Project', Project)
