import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../store/actions/projects'
import { setPopupDisplay } from '../store/reducers/projectsReducer'
import Footer from './Footer'
import Header from './Header'
import Popup from './Popup'
import Project from './Project'

function Home() {
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.projects)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (projects.length === 0 && token) {
      dispatch(getProjects())
    }
  }, [projects.length, dispatch])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  return (
    <div className="container">
      <Header />
      <div className="main">
        {projects && (
          <div className="projects">
            {projects.map((project) => (
              <Project key={project._id} project={project} />
            ))}
          </div>
        )}

        <div className="create_button_wrap">
          <button className="blue_btn_plus" onClick={() => showPopupHandler()}>
            <i className="icon fas fa-plus"></i>
            Create project
          </button>
        </div>

        <Popup />
      </div>
      <Footer />
    </div>
  )
}

export default Home
