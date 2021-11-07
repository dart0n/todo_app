import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProject } from '../../store/actions/projects'
import { setPopupDisplay } from '../../store/reducers/projectsReducer'
import './Popup.scss'

export default function Popup() {
  const [projectName, setProjectName] = useState('')
  const popupDisplay = useSelector((state) => state.projects.popupDisplay)
  const dispatch = useDispatch()

  function createHandler() {
    dispatch(createProject(projectName))
    dispatch(setPopupDisplay('none'))
  }

  return (
    <div
      className="popup"
      autoFocus={false}
      style={{ display: popupDisplay }}
      onClick={() => dispatch(setPopupDisplay('none'))}
    >
      {/* close popup if click outside of .popup__content */}
      <div className="popup__content" onClick={(event) => event.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Create new project</div>
          <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>
            x
          </button>
        </div>
        <input
          type="text"
          placeholder="Project name..."
          autoFocus={true}
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <button className="popup__create" onClick={createHandler}>
          Create
        </button>
      </div>
    </div>
  )
}
