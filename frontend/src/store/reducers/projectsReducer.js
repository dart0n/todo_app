const SET_PROJECTS = 'SET_PROJECTS'
const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'
const ADD_PROJECT = 'ADD_PROJECT'
const UPDATE_PROJECT = 'UPDATE_PROJECT'
const DELETE_PROJECT = 'DELETE_PROJECT'

const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const SORT_TASKS = 'SORT_TASKS'

const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const SET_POPUP_DATE_DISPLAY = 'SET_POPUP_DISPLAY'

const initialState = {
  projects: [],
  currentProject: null,
  popupDisplay: 'none',
  popupDateDisplay: 'none',
}

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects: action.payload }
    case SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.payload }
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] }
    case UPDATE_PROJECT: {
      const foundIndex = state.projects.findIndex((p) => p._id === action.payload._id)
      let newProjects = [...state.projects]
      newProjects[foundIndex] = { ...action.payload }
      return { ...state, projects: newProjects }
    }
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload }
    case SET_POPUP_DATE_DISPLAY:
      return { ...state, popupDateDisplay: action.payload }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: [...state.projects.filter((project) => project._id !== action.payload)],
      }
    case ADD_TASK: {
      const { project_id } = action.payload

      const foundIndex = state.projects.findIndex((p) => p._id === project_id)
      let updatedProjects = [...state.projects]
      let foundProject = updatedProjects[foundIndex]

      if (foundProject.hasOwnProperty('tasks')) {
        foundProject.tasks.push(action.payload)
      } else {
        foundProject = { ...foundProject, tasks: [action.payload] }
      }
      updatedProjects[foundIndex] = { ...foundProject }
      return { ...state, projects: updatedProjects }
    }
    case UPDATE_TASK: {
      const { _id, project_id } = action.payload

      const foundIndex = state.projects.findIndex((p) => p._id === project_id)
      let updatedProjects = [...state.projects]
      let foundProject = updatedProjects[foundIndex]

      let foundTaskIndex = 0
      if (foundProject.hasOwnProperty('tasks')) {
        foundTaskIndex = foundProject.tasks.findIndex((t) => t._id === _id)
      }

      foundProject.tasks[foundTaskIndex] = { ...action.payload }
      updatedProjects[foundIndex] = foundProject
      return { ...state, projects: updatedProjects }
    }
    case DELETE_TASK: {
      const { _id, project_id } = action.payload

      const foundIndex = state.projects.findIndex((p) => p._id === project_id)
      let updatedProjects = [...state.projects]
      let foundProject = updatedProjects[foundIndex]

      foundProject.tasks = foundProject.tasks.filter((t) => t._id !== _id)

      updatedProjects[foundIndex] = foundProject
      return { ...state, projects: updatedProjects }
    }
    case SORT_TASKS: {
      const { _id } = action.payload

      const foundIndex = state.projects.findIndex((p) => p._id === _id)
      let newProjects = [...state.projects]
      let foundProject = newProjects[foundIndex]

      foundProject = action.payload
      newProjects[foundIndex] = foundProject
      return { ...state, projects: newProjects }
    }
    default:
      return state
  }
}

// action creators
export const setProjects = (projects) => ({ type: SET_PROJECTS, payload: projects })
export const setCurrentProject = (id) => ({ type: SET_CURRENT_PROJECT, payload: id })
export const addProject = (project) => ({ type: ADD_PROJECT, payload: project })
export const updateProjectAC = (project) => ({ type: UPDATE_PROJECT, payload: project })
export const deleteProjectAC = (id) => ({ type: DELETE_PROJECT, payload: id })

export const addTask = (newTask) => ({ type: ADD_TASK, payload: newTask })
export const updateTaskAC = (task) => ({ type: UPDATE_TASK, payload: task })
export const deleteTaskAC = (task) => ({ type: DELETE_TASK, payload: task })
export const sortTasksAC = (project) => ({ type: SORT_TASKS, payload: project })

export const setPopupDisplay = (display) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
})
