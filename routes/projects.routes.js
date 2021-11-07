const Router = require('express')
const authMiddleware = require('../middlewares/auth')
const ProjectsController = require('../controllers/ProjectsController')
const TasksController = require('../controllers/TasksController')

const router = new Router()

router.get('/', authMiddleware, ProjectsController.index)
router.get('/:id', authMiddleware, ProjectsController.show)
router.put('/:id', authMiddleware, ProjectsController.edit)
router.post('/', authMiddleware, ProjectsController.create)
router.delete('/:id', authMiddleware, ProjectsController.delete)

router.post('/:id/tasks', authMiddleware, TasksController.create)
router.put('/:project_id/tasks/:id', authMiddleware, TasksController.edit)
router.delete('/:project_id/tasks/:id', authMiddleware, TasksController.delete)

module.exports = router
