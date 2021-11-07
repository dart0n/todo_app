const { model, Schema, ObjectId } = require('mongoose')

const Task = new Schema(
  {
    text: { type: String, required: true },
    project_id: { type: ObjectId, ref: 'Project' },
    is_done: { type: Boolean, default: false },
    deadline: { type: Date, default: null },
    priority: { type: String, enum: ['Default', 'Important'], default: 'Default' },
  },
  { timestamps: true }
)

module.exports = model('Task', Task)
