import './App.css'
import './StudentTable.css'

import { useActionState } from 'react'
import { useNavigate, NavLink } from 'react-router'

function Login () {
  const API_URL = 'http://localhost:8000/api/login'
  const navigate = useNavigate()

  async function handleSubmit (previousState, formData) {
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString()

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.success === false) {
        const validationErrors = result.errors
          ? Object.values(result.errors).flat().join(' ')
          : ''

        return {
          success: false,
          message:
            validationErrors || result.message || 'Invalid email or password.'
        }
      }

      const loggedInUser = result.user || result.data?.user

      if (loggedInUser) {
        localStorage.setItem('user', JSON.stringify(loggedInUser))
      }

      navigate('/dashboard', { replace: true })

      return {
        success: true,
        message: result.message
      }
    } catch (error) {
      console.error('Login error:', error)

      return {
        success: false,
        message: 'Unable to connect to the server. Please try again.'
      }
    }
  }

  const [state, action, pending] = useActionState(handleSubmit, null)

  return (
    <div className='login-page'>
      <form className='student-form login-form' action={action}>
        <h1>Login</h1>

        {state?.message && (
          <p
            className={state.success ? 'login-success' : 'login-error'}
            role='status'
          >
            {state.message}
          </p>
        )}

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            className='input-field'
            autoComplete='username'
            required
            disabled={pending}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            className='input-field'
            autoComplete='current-password'
            required
            disabled={pending}
          />
        </div>

        <button
          type='submit'
          className='submit-btn login-submit'
          disabled={pending}
        >
          {pending ? 'Logging in...' : 'Login'}
        </button>

        <p className='register-text'>
          Don't have an account?{' '}
          <NavLink to='/register' className='register-link'>
            Register here
          </NavLink>
        </p>
      </form>
    </div>
  )
}

export default Login
