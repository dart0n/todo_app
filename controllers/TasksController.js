const Project = require('../models/Project')
const Task = require('../models/Task')

class TasksController {
  async create(req, res) {
    try {
      const { text } = req.body

      const project = await Project.findById(req.params.id).populate('tasks')

      if (!project) return res.status(404).json({ error: 'Not found' })

      if (text.trim() === '') return res.status(422).json({ error: 'Task cannot be blank' })

      let newOrder = 1
      if (project.tasks.length) {
        // find max value of orders
        const orders = project.tasks.map((t) => t.order)
        newOrder = Math.max(...orders) + 1
      }

      const task = new Task({ text, project_id: project.id, is_done: false, order: newOrder })
      await task.save()

      project.tasks.push(task._id)

      await project.save()
      res.status(201).json(task)
    } catch (e) {
      console.log(e)
      res.status(422).json({ error: 'Invalid data' })
    }
  }

  async sort(req, res) {
    try {
      const { id, project_id } = req.params
      const { new_order } = req.query

      const task = await Task.findById(id)

      if (new_order) {
        const old_order = task.order

        if (new_order > old_order) {
          // move task bottom in list (decrement order fields)
          const tasks = await Task.updateMany(
            { order: { $lte: new_order, $gte: old_order }, project_id: project_id },
            { $inc: { order: -1 } }
          )
        } else {
          // move task up in list (increment order fields)
          const tasks = await Task.updateMany(
            { order: { $gte: new_order, $lte: old_order }, project_id: project_id },
            { $inc: { order: 1 } }
          )
        }

        task.order = new_order
        await task.save()
      }
      const project = await Project.findById(project_id).populate({ path: 'tasks', options: { sort: 'order' } })
      res.json(project)
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: 'Not found' })
    }
  }

  async edit(req, res) {
    try {
      const { text } = req.body

      if (text && text.trim() === '') return res.status(422).json({ error: 'Task cannot be blank' })

      const task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.json(task)
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: 'Not found' })
    }
  }

  async delete(req, res) {
    try {
      const { id, project_id } = req.params

      const project = await Project.findById(project_id)

      await Task.findByIdAndDelete(id)

      // delete task from project reference array
      const index = project.tasks.indexOf(id)
      project.tasks = project.tasks.splice(index, 1)

      await project.save()
      res.status(204).send()
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: 'Not found' })
    }
  }
}

module.exports = new TasksController()
