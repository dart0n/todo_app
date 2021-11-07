const Project = require('../models/Project')
const Task = require('../models/Task')

class TasksController {
  async create(req, res) {
    try {
      const { text } = req.body

      const project = await Project.findById(req.params.id)

      if (!project) return res.status(404).json({ error: 'Not found' })

      if (text.trim() === '') return res.status(422).json({ error: 'Task cannot be blank' })

      const task = new Task({ text, project_id: project.id, is_done: false })
      await task.save()
      project.tasks.push(task.id)
      await project.save()
      res.status(201).json(task)
    } catch (e) {
      console.log(e)
      res.status(422).json({ error: 'Invalid data' })
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
