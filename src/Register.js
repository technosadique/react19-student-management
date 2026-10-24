import { useActionState, useState } from 'react'
import { useNavigate, NavLink } from 'react-router'
import './StudentTable.css'

function Register () {
  const [isValid, setIsValid] = useState(false)
  const [success, setsuccess] = useState(false)

  //const API_URL = 'http://localhost:3000/students'
  const API_URL = 'http://localhost:8000/api/register'
  const navigate = useNavigate()

  const handleChange = e => {
    const form = e.target.form
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    if (name && email && password) {
      setIsValid(true)
    } else {
      setIsValid(false)
      setsuccess(false)
    }
  }

  const handleSubmit = async (previousData, formData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    await new Promise(resolve => setTimeout(resolve, 2000))

    const data = {
      name,
      email,
      password
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      navigate('/')

      const result = await response.json()
      console.log(result)
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
    <div className='dashboard'>
      <main className='login-page'>
        <form className='student-form login-form' action={action}>
          <h1>Register</h1>
          <p className='form-description'>Enter your details below.</p>

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
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password'
              className='input-field'
              required
            />
          </div>

                   
            <button
              type='submit'
              className='submit-btn'
              disabled={!isValid || pending}
            >
              {pending ? 'Submitting...' : 'Submit Data'}
            </button>

             <p className='register-text'>
           Existing User?{' '}
          <NavLink to='/' className='register-link'>
            Login
          </NavLink>
        </p>
         
        </form>
      </main>
    </div>
  )
}

export default Register
