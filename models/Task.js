const { model, Schema, ObjectId } = require('mongoose')

const Task = new Schema(
  {
    text: { type: String, required: true },
    project_id: { type: ObjectId, ref: 'Project' },
    is_done: { type: Boolean, default: false },
    deadline: { type: Date, default: null },
    order: { type: Number, required: true, default: 1 }, // for drag and drop sorting on frontend
  },
  { timestamps: true }
)

module.exports = model('Task', Task)
