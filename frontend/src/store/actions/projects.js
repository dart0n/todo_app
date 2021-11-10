import axios from 'axios'
import {
  addProject,
  setProjects,
  deleteProjectAC,
  addTask,
  updateTaskAC,
  deleteTaskAC,
  updateProjectAC,
  sortTasksAC,
} from '../reducers/projectsReducer'
import { API_URL } from '../../config'

export function getProjects() {
  if (!localStorage.getItem('token')) return

  return async (dispatch) => {
    try {
      let url = `${API_URL}/projects`

      const response = await axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      dispatch(setProjects(response.data))
    } catch (e) {
      alert(JSON.stringify(e?.response?.data?.error))
    }
  }
}

export function createProject(name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects`,
        { name },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch(addProject(response.data))
    } catch (e) {
      alert(`Validation Error\n${JSON.stringify(e.response.data?.error)}`)
    }
  }
}

export function updateProject(id, name) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch(updateProjectAC(response.data))
    } catch (e) {
      console.log(e)
      alert(`Validation Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function deleteProject(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(deleteProjectAC(id))
    } catch (e) {
      alert(JSON.stringify(e?.response?.data?.error))
    }
  }
}

export function createTask(text, project_id) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects/${project_id}/tasks`,
        { text },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch(addTask(response.data))
    } catch (e) {
      alert(`Validation Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function updateTask(task, field, value) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${task.project_id}/tasks/${task._id}`,
        {
          [field]: value,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch(updateTaskAC(response.data))
    } catch (e) {
      alert(`Validation Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function deleteTask(task) {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/projects/${task.project_id}/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(deleteTaskAC(task))
    } catch (e) {
      console.log(e)
      alert(`Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function sortTasks(task, newOrder) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${task.project_id}/tasks/${task._id}/sort?new_order=${newOrder}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      dispatch(sortTasksAC(response.data))
    } catch (e) {
      console.log(e)
      alert(`Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}
