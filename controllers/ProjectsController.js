const Project = require('../models/Project')

class ProjectsController {
  async index(req, res) {
    try {
      const projects = await Project.find({ user_id: req.user.id }).populate('tasks')
      res.json(projects)
    } catch (e) {
      console.log(e)
      res.status(503).json({ error: 'Something went wrong, try again' })
    }
  }

  async show(req, res) {
    try {
      const project = await Project.findById(req.params.id).populate('tasks')
      res.json(project)
    } catch (e) {
      res.status(404).json({ error: 'Not found' })
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body

      const project = new Project({ name, user_id: req.user.id })
      await project.save()
      res.status(201).json(project)
    } catch (e) {
      res.status(422).json({ error: 'Invalid data' })
    }
  }

  async edit(req, res) {
    try {
      const project = await Project.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate('tasks')
      res.json(project)
    } catch (e) {
      res.status(404).json({ error: 'Not found' })
    }
  }

  async delete(req, res) {
    try {
      await Project.findByIdAndDelete({ _id: req.params.id })
      res.status(204).send()
    } catch (e) {
      res.status(404).json({ error: 'Not found' })
    }
  }
}

module.exports = new ProjectsController()
