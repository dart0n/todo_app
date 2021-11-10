import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'
import './Header.scss'

export default function Header() {
  const dispatch = useDispatch()

  return (
    <header className="header">
      <button onClick={() => dispatch(logout())} className="btn_logout">
        Logout
      </button>
      <h1>SIMPLE TODO LISTS</h1>
      <h3>FROM RUBY GARAGE</h3>
    </header>
  )
}
