import './App.css'
import './StudentTable.css'

import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, NavLink } from 'react-router'

import StudentAdd from './StudentAdd'
import StudentEdit from './StudentEdit'
import Dashboard from './Dashboard'

const API_URL = 'http://localhost:8000/api/students'

function StudentList () {
  const [studentdata, setStudentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getStudentData()
  }, [])

  async function getStudentData () {
    try {
      setLoading(true)

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to fetch student data')
      }

      const data = await response.json()
      console.log(data)
      setStudentData(data.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteStudent (id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete student')
      }

      setStudentData(prev => prev.filter(student => student.id !== id))

      alert('Student deleted successfully')
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Unable to delete student')
    }
  }

  function editStudent (id) {
    navigate(`/edit/${id}`)
  }

  const filteredStudents = studentdata.filter(student =>
    [student.name, student.email, student.phone, student.course].some(value =>
      String(value ?? '')
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
  )

  return (
    <div className='student-table-container'>
      <h1>Student Management</h1>

      <div className='student-toolbar'>
        <NavLink to='/add' className='add-link'>
          Add Student
        </NavLink>

        <input
          type='text'
          className='search-input'
          placeholder='Search by name, email, phone, or course'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className='student-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan='5' className='no-data'>
                Loading...
              </td>
            </tr>
          ) : filteredStudents.length === 0 ? (
            <tr>
              <td colSpan='5' className='no-data'>
                {search ? 'No matching students found' : 'No students found'}
              </td>
            </tr>
          ) : (
            filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td><div className="action-buttons">
                  <button
                    type='button'
                    className='edit-btn'
                    onClick={() => editStudent(student.id)}
                  >
                    Edit
                  </button>

                  <button
                    type='button'
                    className='delete-btn'
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function App () {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/students' element={<StudentList />} />
      <Route path='/add' element={<StudentAdd />} />
      <Route path='/edit/:id' element={<StudentEdit />} />
    </Routes>
  )
}

export default App
