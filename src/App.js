import './App.css'
import './StudentTable.css'

import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, NavLink } from 'react-router'

import StudentAdd from './StudentAdd'
import StudentEdit from './StudentEdit'

const API_URL = 'http://localhost:8000/api/students'

function StudentList () {
  const [studentdata, setStudentData] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className='student-table-container'>
      <h1>Student Management</h1>

      <NavLink to='/add' className='add-link'>
        Add Student
      </NavLink>

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
              <td colSpan='3' className='no-data'>
                Loading...
              </td>
            </tr>
          ) : studentdata.length === 0 ? (
            <tr>
              <td colSpan='3' className='no-data'>
                No students found
              </td>
            </tr>
          ) : (
            studentdata.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td>
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
      <Route path='/' element={<StudentList />} />
      <Route path='/add' element={<StudentAdd />} />
      <Route path='/edit/:id' element={<StudentEdit />} />
    </Routes>
  )
}

export default App
