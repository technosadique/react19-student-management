import './StudentTable.css'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'

function Header () {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('user')
      }
    } else {
      navigate('/', { replace: true })
    }
  }, [])

  function handleLogout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/', { replace: true })
  }

  return (
    <header className='common-header'>
      <NavLink to='/dashboard' className='header-logo'>
        Student Management
      </NavLink>

      <nav className='header-nav'>
        <div className='header-user'>
          <div className='header-avatar'>
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>

          <div className='header-user-info'>
            <span className='header-user-name'>{user?.name || 'User'}</span>
            <span className='header-user-email'>{user?.email || ''}</span>
          </div>

          <button
            type='button'
            className='header-logout-btn'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
