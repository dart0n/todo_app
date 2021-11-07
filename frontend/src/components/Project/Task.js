import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker'
import { deleteTask, updateTask } from '../../store/actions/projects'
import './Task.scss'
import 'react-datepicker/dist/react-datepicker.css'

export default function Task({ task }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(task.is_done)
  const [isEditing, setIsEditing] = useState(false)
  const [taskText, setTaskText] = useState(task.text)
  const [isHovering, setIsHovering] = useState(false)
  const [importantPriority, setImportantPriority] = useState(false)
  const [isAddingDate, setIsAddingDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [deadline, setDeadline] = useState(null)

  useEffect(() => {
    if (checked !== task.is_done) {
      dispatch(updateTask(task, 'is_done', checked))
    }

    if (task.priority === 'Important') {
      setImportantPriority(true)
    }

    if (task.deadline) {
      const newDeadline = new Date(task.deadline)
      setDeadline(newDeadline)
    }
  }, [checked, dispatch, task, isEditing])

  const handleChecked = () => {
    setChecked(!checked)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    setTaskText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      return setIsEditing(false)
    }
    if (e.key === 'Enter') {
      if (taskText.trim() === '') {
        setTaskText(task.text)
        return alert(`Error\nTask cannot be blank`)
      }

      dispatch(updateTask(task, 'text', taskText))
      setIsEditing(false)
    }
  }

  const handlePriority = () => {
    if (importantPriority) {
      dispatch(updateTask(task, 'priority', 'Default'))
      setImportantPriority(false)
    } else {
      dispatch(updateTask(task, 'priority', 'Important'))
      setImportantPriority(true)
    }
  }

  const handleDoubleClick = () => setIsAddingDate(true)

  const handleChangeDate = (date) => {
    setDate(date)
    dispatch(updateTask(task, 'deadline', date))
    setDate(new Date())
    setIsAddingDate(false)
  }

  const handleDeleteDeadline = () => {
    dispatch(updateTask(task, 'deadline', null))
    setDeadline(null)
  }

  return (
    <div
      className="task"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => (isEditing ? null : setIsHovering(false))}
    >
      <div className="task__checkbox">
        <input type="checkbox" checked={checked} onChange={handleChecked} />
      </div>

      <div className="task__text" onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            type="text"
            autoFocus
            value={taskText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              setIsEditing(false)
              setIsHovering(false)
            }}
            className="task__text_input"
          />
        ) : (
          <span
            className={`text_wrapper ${task.is_done ? 'done' : ''} ${task.priority === 'Important' ? 'important' : ''}`}
          >
            <span className="text">{task.text}</span>
            {isAddingDate ? (
              <span className="datepicker">
                <DatePicker selected={date} onChange={handleChangeDate} />
                <i onClick={() => setIsAddingDate(false)} title="Cancel" className="fas fa-backspace"></i>
              </span>
            ) : (
              <span className="deadline">
                {task.deadline && (
                  <>
                    {deadline && `${deadline.toLocaleDateString()}`}
                    <i onClick={handleDeleteDeadline} title="Delete" className="fas fa-ban"></i>
                  </>
                )}
              </span>
            )}
          </span>
        )}
      </div>

      <div className="task__actions">
        {isHovering && (
          <>
            <button onClick={handlePriority}>
              <i className={`${task.priority === 'Important' ? 'fas' : 'far'} fa-star`} title="Priority"></i>
            </button>
            <button onClick={handleEdit}>
              <i className="fas fa-pen"></i>
            </button>
            <button onClick={() => dispatch(deleteTask(task))}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
