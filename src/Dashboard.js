import './StudentTable.css'
import { Routes, Route, NavLink } from 'react-router'
import StudentList from './App'
import Header from './Header'

function Dashboard () {
  return (
    <div className='dashboard'>
      <Header />

      <main className='dashboard-content'>
        <h2>Dashboard</h2>
        <p className='dashboard-description'>
          Welcome! Manage your student records below.
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
