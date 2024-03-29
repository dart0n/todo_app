import axios from 'axios'
import { API_URL } from '../../config'
import { logoutAC, setToken, setUser } from '../reducers/authReducer'
import { setProjects } from '../reducers/projectsReducer'

export function register(formFields) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formFields)
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
    } catch (e) {
      if (e.response?.data?.errors) {
        return alert(`Validation error:\n${e.response?.data?.errors.map((e) => e.msg + '\n').join('')}`)
      }
      alert(`Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function login(formFields) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formFields)
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
    } catch (e) {
      console.log(e)
      if (e.response?.data?.errors) {
        return alert(`Validation error:\n${e.response.data?.errors.map((e) => e.msg + '\n').join('')}`)
      }
      alert(`Error\n${JSON.stringify(e.response?.data?.error)}`)
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(logoutAC())
      dispatch(setToken(null))
      dispatch(setProjects([]))
    } catch (e) {
      console.log(e)
    }
  }
}

export const authenticateUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))
    } catch (e) {
      dispatch(setToken(null))
      dispatch(logoutAC())
      localStorage.removeItem('token')
    }
  }
}
