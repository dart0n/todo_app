import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, deleteProject, updateProject } from '../../store/actions/projects'
import './Project.scss'
import Tasks from './Tasks'

export default function Project({ project }) {
  const dispatch = useDispatch()
  const [taskText, setTaskText] = useState('')
  const [projectName, setProjectName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isEditing) {
      setProjectName(project.name)
      setIsHovering(true)
    }
  }, [isEditing, project.name])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    setProjectName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsHovering(false)
      return setIsEditing(false)
    }
    if (e.key === 'Enter') {
      if (projectName.trim() === '') {
        setProjectName(project.name)
        return alert(`Error\nProject name cannot be blank`)
      }

      dispatch(updateProject(project._id, projectName))
      setIsHovering(false)
      setIsEditing(false)
    }
  }

  const handleCreateTask = () => {
    if (taskText === '') {
      alert('Error: Task cannot be blank')
    } else {
      dispatch(createTask(taskText.trim(), project._id))
      setTaskText('')
    }
  }

  return (
    <div className="project">
      <div
        className="project__header"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => (isEditing ? null : setIsHovering(false))}
      >
        <div>
          <i className="icon far fa-calendar-alt"></i>
        </div>
        <div className="project__name">
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={projectName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={(e) => setIsEditing(false)}
              className="project__name_input"
            />
          ) : (
            <>{project.name}</>
          )}
        </div>

        {isHovering && (
          <div className="actions">
            <button onClick={handleEdit} className="edit">
              <i className="fas fa-pen"></i>
            </button>
            <button onClick={() => dispatch(deleteProject(project._id))}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        )}
      </div>

      <div className="project__new_task">
        <i className="icon-plus fas fa-plus"></i>
        <input
          type="text"
          placeholder="Start typing here to create a task..."
          className="new_task_input"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button className="green_btn" onClick={handleCreateTask} disabled={taskText.trim() === ''}>
          Add Task
        </button>
      </div>

      <div className="project__tasks">{project.tasks && <Tasks tasks={project.tasks} />}</div>
    </div>
  )
}
