import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from './Header'

function StudentEdit () {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')

  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const [user, setUser] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)

  const API_LOGOUT_URL = 'http://localhost:8000/api'

  //const API_URL = 'http://localhost:3000/students';
  const API_URL = 'http://localhost:8000/api/students'

  useEffect(() => {
    async function getStudentData () {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          throw new Error('Student not found')
        }

        const data = await response.json()

        setName(data.data.name || '')
        setEmail(data.data.email || '')
        setCourse(data.data.course || '')
        setPhone(data.data.phone || '')
        setGender(data.data.gender || '')
      } catch (err) {
        setError(err.message || 'Failed to fetch student data')
      } finally {
        setLoading(false)
      }
    }

    getStudentData()
  }, [id])

  async function updateStudent (e) {
    e.preventDefault()

    if (
      !name.trim() ||
      !email.trim() ||
      !course.trim() ||
      !phone.trim() ||
      !gender
    ) {
      setError('Please fill in all fields')
      return
    }

    try {
      setPending(true)
      setError('')

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          course: course.trim(),
          phone: phone.trim(),
          gender
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update student')
      }

      alert('Student updated successfully!')
      navigate('/students')
    } catch (err) {
      setError(err.message || 'Unable to update student')
    } finally {
      setPending(false)
    }
  }

  if (loading) {
    return (
      <div className='student-table-container'>
        <p>Loading ...</p>
      </div>
    )
  }

  if (error === 'Student not found') {
    return (
      <div className='student-table-container'>
        <p className='error-message'>{error}</p>
        <button
          type='button'
          className='cancel-btn'
          onClick={() => navigate('/students')}
        >
          Back to Students
        </button>
      </div>
    )
  }

  return (
    <div className='dashboard'>
      <Header />

      <main className='dashboard-content'>
        <form className='student-form' onSubmit={updateStudent}>
          <h1>Edit Student</h1>

          <p className='form-description'>Update the student details below.</p>

          {error && <p className='error-message'>{error}</p>}

          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter your name'
              className='input-field'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='input-field'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='course'>Course</label>
            <input
              id='course'
              name='course'
              type='text'
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder='Enter your course'
              className='input-field'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='phone'>Phone</label>
            <input
              id='phone'
              name='phone'
              type='text'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder='Enter your phone number'
              className='input-field'
              required
            />
          </div>

          <div className='form-group'>
            <label>Gender</label>

            <div className='gender-options'>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='Male'
                  checked={gender === 'Male'}
                  onChange={e => setGender(e.target.value)}
                  required
                />
                Male
              </label>

              <label>
                <input
                  type='radio'
                  name='gender'
                  value='Female'
                  checked={gender === 'Female'}
                  onChange={e => setGender(e.target.value)}
                />
                Female
              </label>

              <label>
                <input
                  type='radio'
                  name='gender'
                  value='Other'
                  checked={gender === 'Other'}
                  onChange={e => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>

          <div className='form-buttons'>
            <button
              type='button'
              className='cancel-btn'
              onClick={() => navigate('/students')}
              disabled={pending}
            >
              Cancel
            </button>
            <button type='submit' className='submit-btn' disabled={pending}>
              {pending ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default StudentEdit
