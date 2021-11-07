import axios from 'axios'
import {
  addProject,
  setProjects,
  deleteProjectAC,
  addTask,
  updateTaskAC,
  deleteTaskAC,
  updateProjectAC,
} from '../reducers/projectsReducer'
import { API_URL } from '../../config'

const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }

export function getProjects() {
  return async (dispatch) => {
    try {
      let url = `${API_URL}/projects`

      const response = await axios.get(url, headers)
      dispatch(setProjects(response.data))
    } catch (e) {
      alert(JSON.stringify(e?.response?.data?.error))
    }
  }
}

export function createProject(name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, { name }, headers)
      dispatch(addProject(response.data))
    } catch (e) {
      alert(`Validation Error\n${JSON.stringify(e.response.data?.error)}`)
    }
  }
}

export function updateProject(id, name) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/projects/${id}`, { name }, headers)
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
      await axios.delete(`${API_URL}/projects/${id}`, headers)
      dispatch(deleteProjectAC(id))
    } catch (e) {
      alert(JSON.stringify(e?.response?.data?.error))
    }
  }
}

export function createTask(text, project_id) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/projects/${project_id}/tasks`, { text }, headers)
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
        headers
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
      await axios.delete(`${API_URL}/projects/${task.project_id}/tasks/${task._id}`, headers)
      dispatch(deleteTaskAC(task))
    } catch (e) {
      console.log(e)
      alert(`Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}
