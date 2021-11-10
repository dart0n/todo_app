import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortTasks } from '../../store/actions/projects'
import Task from './Task'
import './Tasks.scss'

export default function Tasks({ tasks = [] }) {
  const dispatch = useDispatch()
  const [currentTask, setCurrentTask] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDragStart = (e, task, index) => {
    if (isDragging) {
      setCurrentTask(task)
    }
  }

  const handleDrop = (e, task, index) => {
    if (isDragging) {
      e.preventDefault()
      const newIndex = index
      const newOrder = tasks[newIndex].order

      dispatch(sortTasks(currentTask, newOrder))
      setIsDragging(false)
    }
  }

  return (
    <div className="tasks">
      {tasks.map((task, index) => (
        <div
          className="task__wrap"
          key={task._id}
          draggable={isDragging}
          onDragOver={handleDragOver}
          onDragStart={(e) => handleDragStart(e, task, index)}
          onDrop={(e) => handleDrop(e, task, index)}
        >
          <Task task={task} setIsDragging={setIsDragging} />
        </div>
      ))}
    </div>
  )
}
