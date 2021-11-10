const SET_USER = 'SET_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGOUT = 'LOGOUT'

const initialState = {
  isAuthenticated: false,
  current_user: null,
  token: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, isAuthenticated: true, current_user: action.payload }
    case SET_TOKEN:
      localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload }
    case LOGOUT:
      localStorage.removeItem('token')
      return { ...state, isAuthenticated: false, current_user: null, token: null }
    default:
      return state
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setToken = (token) => ({ type: SET_TOKEN, payload: token })

export const logoutAC = () => ({ type: LOGOUT })
