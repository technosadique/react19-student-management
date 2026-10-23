import { useActionState, useState } from 'react'
import { useNavigate } from 'react-router'
import './StudentTable.css'

function StudentAdd () {
  const [isValid, setIsValid] = useState(false)
  const [success, setsuccess] = useState(false)

  //const API_URL = 'http://localhost:3000/students'
  const API_URL = 'http://localhost:8000/api/students'
  const navigate = useNavigate()

  const handleChange = e => {
    const form = e.target.form
    const name = form.name.value
    const email = form.email.value
    const course = form.course.value
    const phone = form.phone.value
    const gender = form.gender.value

    if (name && email && course && phone && gender) {
      setIsValid(true)
    } else {
      setIsValid(false)
      setsuccess(false)
    }
  }

  const handleSubmit = async (previousData, formData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const course = formData.get('course')
    const phone = formData.get('phone')
    const gender = formData.get('gender')
    await new Promise(resolve => setTimeout(resolve, 2000))

    const data = {
      name,
      email,
      course,
      phone,
      gender
    }

    try {
      //const response = await fetch('http://localhost:3000/students', {

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      navigate('/')
      alert('Student added successfully!')
      const result = await response.json()
      setIsValid(false)
      setsuccess(true)
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
    }
  }
  const [data, action, pending] = useActionState(handleSubmit, null)

  return (
    <div className='student-table-container'>
      <form className='student-form' action={action}>
        {success && (
          <p className='success-message'>Student added successfully!</p>
        )}

        <h1>Add Student</h1>
        <p className='form-description'>Enter the student details below.</p>

        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Enter your name'
            className='input-field'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email'
            className='input-field'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='course'>Course</label>
          <input
            id='course'
            onChange={handleChange}
            type='text'
            name='course'
            placeholder='Enter your course'
            className='input-field'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            id='phone'
            onChange={handleChange}
            type='text'
            name='phone'
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
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label>
              <input
                type='radio'
                name='gender'
                value='Female'
                onChange={handleChange}
              />
              Female
            </label>

            <label>
              <input
                type='radio'
                name='gender'
                value='Other'
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className='form-buttons'>
          <button
            type='button'
            className='cancel-btn'
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='submit-btn'
            disabled={!isValid || pending}
          >
            {pending ? 'Submitting...' : 'Submit Data'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentAdd
