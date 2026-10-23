import './App.css'
import './StudentTable.css'

import { Routes, Route, NavLink } from 'react-router'
import StudentList from './App'

function Dashboard () {
  return (
    <div className='dashboard'>
      <header className='dashboard-header'>
        <div>
          <h1>Student Management</h1>
          <p>Manage students and their information</p>
        </div>
      </header>

      <main className='dashboard-content'>
        <h2>Dashboard</h2>
        <p className='dashboard-description'>
          Welcome! Choose an option to get started.
        </p>

        <NavLink to='/students' className='dashboard-card'>
          <div className='dashboard-card-icon'>🎓</div>
          <div className='dashboard-card-text'>
            <h3>Student List</h3>
            <p>View, search, edit, and delete student records.</p>
          </div>
          <span className='dashboard-arrow'>→</span>
        </NavLink>

        <Routes>
          <Route path='/students' element={<StudentList />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
