import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, register } from '../../store/actions/auth'
import './Auth.scss'

export default function Auth() {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [formFields, setFormFields] = useState({ login: '', password: '' })

  const toggleLogin = () => setIsLogin(!isLogin)

  const handleChange = (e) => setFormFields({ ...formFields, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formFields.login.trim() === '') {
      setFormFields({ ...formFields, password: '' })
      return alert('Login cannot be blank')
    }

    if (formFields.password.trim() === '') {
      setFormFields({ ...formFields, password: '' })
      return alert('Password cannot be blank')
    }

    dispatch(isLogin ? login(formFields) : register(formFields))
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="auth__content">
        <h1>{isLogin ? 'Login' : 'Registration'}</h1>

        <div className="auth__field">
          <span>Login:</span>
          <input type="text" className="auth__input" name="login" value={formFields.login} onChange={handleChange} />
        </div>

        <div className="auth__field">
          <span>Password:</span>
          <input
            type="password"
            className="auth__input"
            name="password"
            value={formFields.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="auth__btn_submit">
          Sign {isLogin ? 'In' : 'Up'}
        </button>
        <span>
          or{' '}
          <button onClick={toggleLogin} type="button" className="auth__btn">
            Sign {isLogin ? 'Up' : 'In'}
          </button>
        </span>
      </form>
    </div>
  )
}
